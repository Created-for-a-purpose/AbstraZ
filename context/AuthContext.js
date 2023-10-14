'use client'
import { useCallback, createContext, useState, useEffect } from 'react'
import { Web3AuthModalPack } from '@safe-global/auth-kit'
import { CHAIN_NAMESPACES, WALLET_ADAPTERS } from '@web3auth/base'
import { EthereumPrivateKeyProvider } from '@web3auth/ethereum-provider'
import { OpenloginAdapter } from '@web3auth/openlogin-adapter'
import { GelatoRelayPack } from '@safe-global/relay-kit'
import AccountAbstraction from '@safe-global/account-abstraction-kit-poc'
import { SafeFactory, EthersAdapter } from '@safe-global/protocol-kit'
import { ethers } from 'ethers'

const defaultState = {
    login: () => {},
}

const AuthContext = createContext(defaultState)

const AuthContextProvider = ({ children }) => {
    const [eoa, setEoa] = useState('')
    const [safes, setSafes] = useState([])
    const [web3AuthModalPack, setWeb3AuthModalPack] = useState(null)
    const [provider, setProvider] = useState(null)

    useEffect(() => {
        async function loadAuthModal() {
            const chainConfig = {
                chainNamespace: CHAIN_NAMESPACES.EIP155,
                // chainId: '0x13881',
                // rpcTarget: 'https://indulgent-shy-aura.matic-testnet.discover.quiknode.pro/f3eadc815d04049d61d581cc6e1f6a6f152c7eec/'
                chainId: '0x5a2',
                rpcTarget: 'https://rpc.public.zkevm-test.net'
            }
            const options = {
                clientId: 'BOR5khYqb4xXeXqZHeoLx7gwIhYUFLiyLyrQHjmrOjJaUvijslO_k4z7AkV23hVOzGIFmzfEaPwsGEO7EbLxmAs',
                web3AuthNetwork: 'testnet',
                chainConfig,
                uiConfig: {
                    theme: 'dark',
                    loginMethodsOrder: ['google', 'facebook']
                }
            }
            const modalConfig = {
                [WALLET_ADAPTERS.TORUS_EVM]: {
                    label: 'torus',
                    showOnModal: false
                },
                [WALLET_ADAPTERS.METAMASK]: {
                    label: 'metamask',
                    showOnDesktop: true,
                    showOnMobile: false
                }
            }
            const privateKeyProvider = new EthereumPrivateKeyProvider({
                config: { chainConfig }
            })
            const openloginAdapter = new OpenloginAdapter({
                loginSettings: {
                    mfaLevel: 'mandatory'
                },
                adapterSettings: {
                    uxMode: 'popup',
                    whiteLabel: {
                        appName: 'Safe'
                    }
                }, privateKeyProvider
            })
            // Instantiate and initialize the pack
            const web3AuthModalPack = new Web3AuthModalPack({
                txServiceUrl: ''
            })
            await web3AuthModalPack.init({ options, adapters: [openloginAdapter], modalConfig })
            setWeb3AuthModalPack(web3AuthModalPack)
        }
        loadAuthModal()
    }, [])

    const login = useCallback(async () => {
        if (!web3AuthModalPack) return

        const { safes, eoa } = await web3AuthModalPack.signIn()
        setEoa(eoa)
        setSafes(safes || [])

        const provider = new ethers.providers.Web3Provider(web3AuthModalPack.getProvider())
        setProvider(provider)
    }, [web3AuthModalPack])

    useEffect(() => {
        if (web3AuthModalPack && web3AuthModalPack.getProvider())
            (async () => await login())()
    }, [web3AuthModalPack, login])

    const fetchSafeAddress = async () => {
        if (!provider) return
        const signer = provider.getSigner()
        const safeAccountAbs = new AccountAbstraction(signer)
        const relayPack = new GelatoRelayPack()
        await safeAccountAbs.init({ relayPack })
        const safe = await safeAccountAbs.getSafeAddress();
        setSafes([safe])
    }

    const fetchSafeBalance = async () => {
        const balance = await provider?.getBalance(safes[0])
        return balance?.toString();
    }

    const createTreasurySafe = async (operators)=>{
        if(!provider) return
        const signer = await provider.getSigner()
        const ethAdapter = new EthersAdapter({
            signerOrProvider: signer,
            ethers
        })
        const safeFactory = await SafeFactory.create({ ethAdapter })
        const safeAccountConfig = {
            owners: [
                ...operators,
                await signer.getAddress()
            ],
            threshold: 2
        }
        const txOptions = {
            gasLimit: '1000000',
            gas: '2100000',
            gasPrice: '8000000000',
        }
        const safeSdkOwner = await safeFactory.deploySafe({ safeAccountConfig, txOptions })
        const safeAddress = await safeSdkOwner.getAddress()
        return safeAddress
    }

    const createDao = async (daoName, minInv, minInvToken, treasuryAddress)=>{
        
    }
    
    return (
        <AuthContext.Provider value={{ login, eoa, safes, fetchSafeAddress, fetchSafeBalance, createTreasurySafe, createDao }}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContextProvider, AuthContext }