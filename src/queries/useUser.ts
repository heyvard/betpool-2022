import { useQuery } from 'react-query'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { User } from '../domain/user'

export function UseUser() {
    const [user] = useAuthState(firebase.auth())

    return useQuery<User, Error>('user', async () => {
        const idtoken = await user?.getIdToken()
        let responsePromise = await fetch('/api/v1/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${idtoken}` },
        })
        return responsePromise.json()
    })
}