import React, { useEffect } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import FormControl from '@mui/material/FormControl'
import Tooltip from '@mui/material/Tooltip'
import InfoIcon from '@mui/icons-material/Info'
import { TransactionHashType } from 'ternoa-js'
import { setMarketplaceConfigurationTx, CommissionFeeType, ListingFeeType, AccountListType, OffchainDataType } from 'ternoa-js/marketplace'
import { MarketplaceConfigAction, MarketplaceConfigFeeType } from 'ternoa-js/marketplace/enum'

import Box from 'components/base/Box/Box'
import MarketplaceIdField from 'components/base/Fields/MarketplaceIdField'
import Button from 'components/ui/Button/Button'
import Input from 'components/ui/Input/Input'
import Select from 'components/ui/Select/Select'
import { useAppSelector } from 'redux/hooks'

import styles from './SetMarketplaceConfigurationBlock.module.scss'

type IForm = {
  id: number
  commissionFeeAction: MarketplaceConfigAction
  commissionFeeType: MarketplaceConfigFeeType
  commissionFee: number
  listingFeeAction: MarketplaceConfigAction
  listingFeeType: MarketplaceConfigFeeType
  listingFee: number
  accountListAction: MarketplaceConfigAction
  offchainDataAction: MarketplaceConfigAction
  offchainData: string
}

interface Props {
  signableCallback: (txHashHex: TransactionHashType) => void
}

const Tips = () => (
  <Tooltip
    title={
      <>
        <p>
          <b>Marketplace ID</b> contains the id of the marketplace targeted for the configuration change.
        </p>
        <p>
          4 paramaters can be customized in a marketplace using 3 actions:
          <ul>
            <li>
              <b>No Operation</b>: do not change this setting.
            </li>
            <li>
              <b>Remove</b>: remove this setting.
            </li>
            <li>
              <b>Set</b>: set a new value for this setting.
            </li>
          </ul>
          <br />
          The customizable parameters list is:
          <ul>
            <li>
              <b>Commission Fee</b> specifies the commission fee charged by the marketplace on a sale. It can be a percentage of the NFT listing price (which
              will be transform to a permill value) or a flat charge amount in $CAPS (which will be transform to BN).
            </li>
            <li>
              <b>Listing Fee</b> specifies the listing fee charged by the marketplace on the listing of an NFT. It can be a percentage of the NFT listing price
              (which will be transform to a permill value) or a flat charge amount in $CAPS (which will be transform to BN).
            </li>
            <li>
              <b>Account List</b> defines the allowed users to list on this marketplace if the marketplace&apos;s kind is <b>Private</b>. It defines the
              blacklisted users of this marketplace if the marketplace&apos;s kind is <b>Public</b>.
            </li>
            <li>
              <b>Offchain Data</b> defines marketplace&apos;s metadata. It can be an IPFS Hash, an URL or plain text. (max: 150 characters)
            </li>
          </ul>
        </p>
      </>
    }
  >
    <InfoIcon />
  </Tooltip>
)

const prettifyActionValue = (action: string, addtionnal: string): string => {
  switch (action) {
    case MarketplaceConfigAction.Noop:
      return 'No Operation'
    case MarketplaceConfigAction.Remove:
      return 'Remove' + addtionnal
    case MarketplaceConfigAction.Set:
      return 'Set' + addtionnal
    default:
      return action
  }
}

const prettifyFeeTypeValue = (feeType: string): string => {
  switch (feeType) {
    case MarketplaceConfigFeeType.Percentage:
      return 'Percentage'
    case MarketplaceConfigFeeType.Flat:
      return 'Flat'
    default:
      return feeType
  }
}

const SetNFTMarketplaceConfigurationBlock = ({ signableCallback }: Props) => {
  const { user } = useAppSelector((state) => state.user)
  const { polkadotWallet } = user
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    watch,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      commissionFeeAction: MarketplaceConfigAction.Noop,
      commissionFeeType: MarketplaceConfigFeeType.Flat,
      commissionFee: 0,
      listingFeeAction: MarketplaceConfigAction.Noop,
      listingFeeType: MarketplaceConfigFeeType.Flat,
      listingFee: 0,
      accountListAction: MarketplaceConfigAction.Noop,
      offchainDataAction: MarketplaceConfigAction.Noop,
    },
    mode: 'onChange',
  })
  const [commissionFeeAction, commissionFeeType, listingFeeAction, listingFeeType, offchainDataAction] = watch([
    'commissionFeeAction',
    'commissionFeeType',
    'listingFeeAction',
    'listingFeeType',
    'offchainDataAction',
  ])

  const onSubmit: SubmitHandler<IForm> = async ({
    id,
    commissionFeeAction,
    commissionFeeType,
    commissionFee,
    listingFeeAction,
    listingFeeType,
    listingFee,
    offchainDataAction,
    offchainData,
  }) => {
    const newCommissionFee: CommissionFeeType =
      commissionFeeAction === MarketplaceConfigAction.Set
        ? commissionFeeType === MarketplaceConfigFeeType.Flat
          ? {
              [MarketplaceConfigAction.Set]: { [MarketplaceConfigFeeType.Flat]: Number(commissionFee) },
            }
          : {
              [MarketplaceConfigAction.Set]: { [MarketplaceConfigFeeType.Percentage]: Number(commissionFee) },
            }
        : commissionFeeAction
    const newListingFee: ListingFeeType =
      listingFeeAction === MarketplaceConfigAction.Set
        ? listingFeeType === MarketplaceConfigFeeType.Flat
          ? {
              [MarketplaceConfigAction.Set]: { [MarketplaceConfigFeeType.Flat]: Number(listingFee) },
            }
          : {
              [MarketplaceConfigAction.Set]: { [MarketplaceConfigFeeType.Percentage]: Number(listingFee) },
            }
        : listingFeeAction
    const newAccountList: AccountListType = MarketplaceConfigAction.Noop
    const newOffchainData: OffchainDataType =
      offchainDataAction === MarketplaceConfigAction.Set
        ? {
            [MarketplaceConfigAction.Set]: offchainData,
          }
        : offchainDataAction
    const setMarketplaceConfigurationTxHex = await setMarketplaceConfigurationTx(id, newCommissionFee, newListingFee, newAccountList, newOffchainData)
    signableCallback(setMarketplaceConfigurationTxHex)
  }

  useEffect(() => {
    reset()
  }, [polkadotWallet, reset])

  return (
    <Box
      codeSnippet={`
      import { initializeApi } from "ternoa-js"
      import { setMarketplaceConfiguration } from "ternoa-js/marketplace"

      ... //we asume the API instance is already initialize
      ... //and your keyring is already created and provided with CAPS to support transactions fees. 
      
      const updateMarketplaceConfiguration = async () => {
        try { 

          // Here you update your Marketplace's configuration settings for: COMMISSION_FEE, LISTING_FEE, ACCOUNT_LIST, OFFCHAIN_DATA
          // Each parameter object can be build using MarketplaceConfigAction enum from 'ternoa-js/marketplace/enum' (e.g. MarketplaceConfigAction.Remove)
          // COMMISSION_FEE and LISTING_FEE type can by build using MarketplaceConfigFeeType enum from 'ternoa-js/marketplace/enum' (e.g. MarketplaceConfigFeeType.Flat)
          
          // For example the No Operation (Noop) or the Remove action:
          //    COMMISSION_FEE: MarketplaceConfigAction.Noop
          //    OFFCHAIN_DATA: MarketplaceConfigAction.Remove
          // For the Set action:
          //    COMMISSION_FEE or LISTING_FEE: {
          //      [MarketplaceConfigAction.Set]: { [MarketplaceConfigFeeType.Flat]: Number(123) },
          //    }
          //    OFFCHAIN_DATA: {
          //      [MarketplaceConfigAction.Set]: 'Your Marketplace offchain data',
          //    }
          //    ACCOUNT_LIST: {
          //      [MarketplaceConfigAction.Set]: [TERNOA_ADDRESS_1, TERNOA_ADDRESS_2],
          //    }

          const updatedMarketplaceConfigurationSetEvent = await setMarketplaceConfiguration(MARKETPLACE_ID, COMMISSION_FEE, LISTING_FEE, ACCOUNT_LIST, OFFCHAIN_DATA, keyring, WaitUntil.BlockInclusion)
      
        } catch (e) {
          console.log(e)
        }
      }
    `}
      codeSnippetLink="https://ternoa-js.ternoa.dev/modules.html#createNft"
      codeSnippetTitle="Ternoa-JS: createNFT"
      summary="Set or Remove (Noop for No Operation) the marketplace parameters configuration"
      title="Set NFT Marketplace Configuration"
      tooltip={<Tips />}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <MarketplaceIdField control={control} error={errors.id?.message} isError={Boolean(errors.id)} name="id" register={register} required />
        <FormControl fullWidth>
          <Controller
            name="commissionFeeAction"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                defaultValue={MarketplaceConfigAction.Noop}
                error={errors.commissionFeeAction?.message}
                label="Commission Fee Action"
                items={[
                  {
                    value: MarketplaceConfigAction.Noop,
                    label: 'No Operation',
                  },
                  {
                    value: MarketplaceConfigAction.Remove,
                    label: 'Remove Commission',
                  },
                  {
                    value: MarketplaceConfigAction.Set,
                    label: 'Set Commission',
                  },
                ]}
                onChange={onChange}
                renderValue={(value) => prettifyActionValue(value, ' Commission')}
                value={value}
              />
            )}
          />
        </FormControl>
        {commissionFeeAction === MarketplaceConfigAction.Set && (
          <div className={styles.nestedFields}>
            <FormControl fullWidth>
              <Controller
                name="commissionFeeType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    defaultValue={MarketplaceConfigFeeType.Percentage}
                    error={errors.commissionFeeType?.message}
                    label="Type"
                    items={[
                      {
                        value: MarketplaceConfigFeeType.Flat,
                        label: 'Flat',
                      },
                      {
                        value: MarketplaceConfigFeeType.Percentage,
                        label: 'Percentage',
                      },
                    ]}
                    onChange={onChange}
                    renderValue={(value) => prettifyFeeTypeValue(value)}
                    value={value}
                  />
                )}
              />
            </FormControl>
            <Input
              error={errors.commissionFee?.message}
              isError={Boolean(errors.commissionFee)}
              label={`${prettifyFeeTypeValue(commissionFeeType)} Fee`}
              min={0}
              name="commissionFee"
              placeholder="Enter Marketplace commission fee"
              register={register}
              step={0.0001}
              type="number"
              required
            />
          </div>
        )}
        <FormControl fullWidth>
          <Controller
            name="listingFeeAction"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                defaultValue={MarketplaceConfigAction.Noop}
                error={errors.listingFeeAction?.message}
                label="Listing Fee Action"
                items={[
                  {
                    value: MarketplaceConfigAction.Noop,
                    label: 'No Operation',
                  },
                  {
                    value: MarketplaceConfigAction.Remove,
                    label: 'Remove Listing',
                  },
                  {
                    value: MarketplaceConfigAction.Set,
                    label: 'Set Listing',
                  },
                ]}
                onChange={onChange}
                renderValue={(value) => prettifyActionValue(value, ' Listing')}
                value={value}
              />
            )}
          />
        </FormControl>
        {listingFeeAction === MarketplaceConfigAction.Set && (
          <div className={styles.nestedFields}>
            <FormControl fullWidth>
              <Controller
                name="listingFeeType"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Select
                    defaultValue={MarketplaceConfigFeeType.Percentage}
                    error={errors.listingFeeType?.message}
                    label="Type"
                    items={[
                      {
                        value: MarketplaceConfigFeeType.Flat,
                        label: 'Flat',
                      },
                      {
                        value: MarketplaceConfigFeeType.Percentage,
                        label: 'Percentage',
                      },
                    ]}
                    onChange={onChange}
                    renderValue={(value) => prettifyFeeTypeValue(value)}
                    value={value}
                  />
                )}
              />
            </FormControl>
            <Input
              error={errors.listingFee?.message}
              isError={Boolean(errors.listingFee)}
              label={`${prettifyFeeTypeValue(listingFeeType)} Fee`}
              min={0}
              name="listingFee"
              placeholder="Enter Marketplace listing fee"
              register={register}
              step={0.0001}
              type="number"
              required
            />
          </div>
        )}
        <FormControl fullWidth>
          <Controller
            name="accountListAction"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                defaultValue={MarketplaceConfigAction.Noop}
                disabled
                error={errors.accountListAction?.message}
                label="Account List Action"
                insight="This UI do not support this customization now"
                items={[
                  {
                    value: MarketplaceConfigAction.Noop,
                    label: 'No Operation',
                  },
                  {
                    value: MarketplaceConfigAction.Remove,
                    label: 'Remove Account List',
                  },
                  {
                    value: MarketplaceConfigAction.Set,
                    label: 'Set Account List',
                  },
                ]}
                onChange={onChange}
                renderValue={(value) => prettifyActionValue(value, ' Account List')}
                value={value}
              />
            )}
          />
        </FormControl>
        <FormControl fullWidth>
          <Controller
            name="offchainDataAction"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                defaultValue={MarketplaceConfigAction.Noop}
                error={errors.offchainDataAction?.message}
                label="Offchain Data Action"
                items={[
                  {
                    value: MarketplaceConfigAction.Noop,
                    label: 'No Operation',
                  },
                  {
                    value: MarketplaceConfigAction.Remove,
                    label: 'Remove Offchain Data',
                  },
                  {
                    value: MarketplaceConfigAction.Set,
                    label: 'Set Offchain Data',
                  },
                ]}
                onChange={onChange}
                renderValue={(value) => prettifyActionValue(value, ' Offchain Data')}
                value={value}
              />
            )}
          />
        </FormControl>
        {offchainDataAction === MarketplaceConfigAction.Set && (
          <div className={styles.nestedFields}>
            <Input
              error={errors.offchainData?.message}
              isError={Boolean(errors.offchainData)}
              label="Offchain Data"
              name="offchainData"
              placeholder="Enter Marketplace offchainData"
              register={register}
              type="string"
              required
            />
          </div>
        )}
        <Button disabled={isSubmitting || !isValid} text="Set Configuration" type="submit" />
      </form>
    </Box>
  )
}

export default SetNFTMarketplaceConfigurationBlock

const schema = yup.object({
  id: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .min(0, 'Marketplace ID must be greater than or equal to 0')
    .required('Marketplace ID is a required field'),
})
