import type { NextPage } from 'next'

import { Container } from '@mui/system'
import { UseUser } from '../queries/useUser'
import { Spinner } from '../components/loading/Spinner'
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from '../auth/clientApp'
import { useQueryClient } from 'react-query'
import { UseStats } from '../queries/useStats'
import { alleLag } from '../utils/lag'
import LoadingButton from '@mui/lab/LoadingButton'
import SaveIcon from '@mui/icons-material/Save'
import { UseMatches } from '../queries/useMatches'
import dayjs from 'dayjs'
import Link from 'next/link'
import { default as MUILink } from '@mui/material/Link/Link'
import { fixLand } from '../components/bet/BetView'

const Home: NextPage = () => {
    const { data: megselv } = UseUser()
    const [user] = useAuthState(firebase.auth())
    const [lagrer, setLagrer] = useState(false)
    const queryClient = useQueryClient()
    const { data: stats } = UseStats()
    const [topscorer, setTopscorer] = useState(megselv?.topscorer)
    const { data: matches, isLoading: isLoading2 } = UseMatches()
    if (!matches || isLoading2) {
        return <Spinner />
    }
    if (!megselv || !stats) {
        return <Spinner></Spinner>
    }
    const alleLagSortert = alleLag.sort((a, b) => a.norsk.localeCompare(b.norsk))

    const kamper = matches.filter((a) => {
        return dayjs(a.game_start).isAfter(dayjs().subtract(2, 'hours')) && dayjs(a.game_start).isBefore(dayjs())
    })

    return (
        <>
            <Container maxWidth="md" sx={{ mt: 1 }}>
                <Typography variant="h4" component="h1" align={'center'}>
                    Hei {megselv.name} 👋
                </Typography>
                {kamper.map((k) => {
                    return (
                        <Card key={k.id} sx={{ mt: 1 }}>
                            <CardContent>
                                <Link href={'/match/' + k.id}>
                                    <MUILink underline={'hover'} sx={{ cursor: 'pointer' }}>
                                        Nå pågår {fixLand(k.home_team)} vs {fixLand(k.away_team)}
                                    </MUILink>
                                </Link>
                            </CardContent>
                        </Card>
                    )
                })}
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Hvem vinner VM?</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                disabled={lagrer}
                                id="demo-simple-select"
                                value={megselv.winner}
                                label="Hvem winner VM?"
                                onChange={async (e) => {
                                    try {
                                        setLagrer(true)
                                        const idtoken = await user?.getIdToken()
                                        const responsePromise = await fetch(
                                            `https://betpool-2022-backend.vercel.app/api/v1/me/`,
                                            {
                                                method: 'PUT',
                                                body: JSON.stringify({ winner: e.target.value }),
                                                headers: { Authorization: `Bearer ${idtoken}` },
                                            },
                                        )
                                        if (!responsePromise.ok) {
                                            window.alert('oops, feil ved lagring')
                                        }
                                        queryClient.invalidateQueries('user-me').then()
                                        queryClient.invalidateQueries('stats').then()
                                    } finally {
                                        setLagrer(false)
                                    }
                                }}
                            >
                                {alleLagSortert.map((l) => {
                                    return (
                                        <MenuItem key={l.engelsk} value={l.engelsk}>
                                            {l.flagg + ' ' + l.norsk}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </FormControl>
                    </CardContent>
                </Card>
                <Card sx={{ mt: 1 }}>
                    <CardContent>
                        <FormControl fullWidth>
                            <TextField
                                id="outlined-required"
                                label="Hvilken spiller scorer flest mål?"
                                value={topscorer}
                                onChange={(e) => {
                                    setTopscorer(e.target.value)
                                }}
                            />
                            {topscorer != megselv.topscorer && (
                                <LoadingButton
                                    sx={{ mt: 2 }}
                                    variant="contained"
                                    onClick={async () => {
                                        try {
                                            setLagrer(true)
                                            const idtoken = await user?.getIdToken()
                                            const responsePromise = await fetch(
                                                `https://betpool-2022-backend.vercel.app/api/v1/me/`,
                                                {
                                                    method: 'PUT',
                                                    body: JSON.stringify({ topscorer: topscorer }),
                                                    headers: { Authorization: `Bearer ${idtoken}` },
                                                },
                                            )
                                            if (!responsePromise.ok) {
                                                window.alert('oops, feil ved lagring')
                                            }
                                            queryClient.invalidateQueries('user-me').then()
                                        } finally {
                                            setLagrer(false)
                                        }
                                    }}
                                    loading={lagrer}
                                    endIcon={<SaveIcon />}
                                >
                                    Lagre
                                </LoadingButton>
                            )}
                        </FormControl>
                    </CardContent>
                </Card>
            </Container>
        </>
    )
}

export default Home
