import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
import { DIDSession } from 'did-session'
import { atom, useAtom } from 'jotai'
import { useCallback } from 'react'

import { compose } from './graphql'

export type AuthStatus = 'pending' | 'loading' | 'failed'
export type AuthState = { status: 'done'; id: string } | { status: AuthStatus }

const authAtom = atom<AuthState>({ status: 'pending' })

export function useAuth(): [AuthState, () => Promise<void>, () => void] {
    const [state, setState] = useAtom(authAtom)

    const authenticate = useCallback(async (): Promise<void> => {
        if (state.status === 'loading') {
            return
        }
        setState({ status: 'loading' })
        try {
            // @ts-ignore
            const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts',
            })
            const authProvider = new EthereumAuthProvider(
                // @ts-ignore
                window.ethereum,
                accounts[0],
            )
            const session = await DIDSession.authorize(authProvider, {
                resources: compose.resources,
            })
            compose.setDID(session.did)
            setState({ status: 'done', id: session.id })
        } catch (err) {
            console.warn('Authentication error', err)
            setState({ status: 'failed' })
        }
    }, [state.status, setState])

    const reset = useCallback(() => {
        // Note: logout logic not implemented
        setState({ status: 'pending' })
    }, [setState])

    return [state, authenticate, reset]
}
