import type { NextPage } from 'next'
import Link from 'next/link'

import { Link as MuiLink, Typography } from '@mui/material'

const Home: NextPage = () => {
  return (
    <>
      <Typography variant="h1" textAlign="center" fontStyle="bold" mt="4rem">
        Welcome to the Ternoa-js E2E test dApp ⚙️ 🧩
      </Typography>
      <Typography variant="body1" mt="4rem">
        <MuiLink href="https://github.com/capsule-corp-ternoa/ternoa-js" target="_blank" rel="noopener noreferrer" title="ternoa-js SDK Github repository">
          Ternoa-js SDK
        </MuiLink>{' '}
        has been thought with one intention: it aims to be one of the easiest tool to build web3 projects on top of the Ternoa Chain. Based on Polkadot.js API
        and Javascript, it offers application developers the ability to query substrate chains like the Ternoa chain. It provides a seamless experience and
        allows you to start building at a glance : an extra short init and just a few lines of code after, you will create your NFT.
        <br />
        The E2E test dApp is the easiest way to test our SDK. You can submit any transaction to the chain to manage your NFTs or familiarize yourself with our
        helpers with the code snippets.
      </Typography>
      <Typography variant="body1" fontStyle="italic" mt="1.6rem">
        If you look for more global information about Ternoa, check our website{' '}
        <MuiLink href="https://www.ternoa.com" target="_blank" rel="noopener noreferrer" title="Ternoa official website">
          here
        </MuiLink>
        .
      </Typography>
      <Typography variant="h2" mt="4rem">
        App Worklow 🏄‍♂️
      </Typography>
      <Typography variant="body1" mt="2.4rem" component="div">
        The{' '}
        <Link href="/app/NFT/CreateNFT">
          <MuiLink href="/app/NFT/CreateNFT" title="Create NFT Helper" mr="0.4rem">
            Helpers
          </MuiLink>
        </Link>
        section list several helpers from our SDK and their parameters presented in a form. The request is created once the required fields are correctly filled
        in. It has to be signed before being submited to the chain. You can connect your Ternoa Wallet with Wallet Connect or use your Polkadot extension.
        <br />
        <br />
        Ternoa ecosystem is based on 2 environments: Alphanet & Mainnet, where transactions are conducted in $CAPS token.
        <ul>
          <li>
            Alphanet stands for the gateway to explore and test the Ternoa chain. It uses test $CAPS tokens claimable on our faucet here:
            <MuiLink href="https://www.ternoa.com/alphanet" title="Alphanet Faucet" ml="0.4rem">
              Alphanet Faucet
            </MuiLink>
            .
          </li>
          <li>Mainnet is the main chain where data is stored.</li>
        </ul>
        <br />
        By default the dApp is connected to the Alphanet chain. You can swith to Mainnet by clicking on the pill located on the top right corner.
      </Typography>
      <Typography variant="h2" mt="4rem">
        Contribution 🤝
      </Typography>
      <Typography variant="body1" mt="2.4rem">
        ternoa-js SDK and the ternoa-js-test-dapp are open-source projects. Feel free to interact and move forward with us.
      </Typography>
      <Typography variant="body1" mt="2.4rem">
        If you are interested in contributing to ternoa-js-test-dapp read our{' '}
        <MuiLink
          href="https://github.com/capsule-corp-ternoa/ternoa-js-test-dapp/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          title="ternoa-js-test-dapp contributing guidelines"
        >
          contributing guidelines
        </MuiLink>
        .{' '}
      </Typography>
      <Typography variant="body1" mt="2.4rem">
        If you have questions about anything related to Ternoa-js, we will be please to help you. Open a discussion on our{' '}
        <MuiLink
          href="https://github.com/capsule-corp-ternoa/ternoa-js/discussions"
          target="_blank"
          rel="noopener noreferrer"
          title="ternoa-js Github Discussions"
        >
          GitHub Discussions
        </MuiLink>
        . And if you find an issue, lets us know about it here in our{' '}
        <MuiLink href="https://github.com/capsule-corp-ternoa/ternoa-js/issues" target="_blank" rel="noopener noreferrer" title="ternoa-js Github Issues">
          GitHub Issues
        </MuiLink>{' '}
        section.
      </Typography>
    </>
  )
}

export default Home
