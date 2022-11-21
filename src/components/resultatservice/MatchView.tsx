import { Box, Card, CardContent, TextField, Typography } from '@mui/material'
import { Match } from '../../types/types'
import dayjs from 'dayjs'
import { useState } from 'react'
import SaveIcon from '@mui/icons-material/Save'
import LoadingButton from '@mui/lab/LoadingButton'
import { hentFlag, hentNorsk } from '../../utils/lag'
import Link from 'next/link'
import { default as MUILink } from '@mui/material/Link/Link'
import { UseMutateMatch } from '../../queries/mutateMatch'

export const MatchView = ({ match }: { match: Match }) => {
    const numberPropTilString = (prop: number | null) => {
        if (prop == null) {
            return ''
        }
        return `${prop}`
    }

    let hjemmescoreProp = numberPropTilString(match.home_score)
    const [hjemmescore, setHjemmescore] = useState<string>(hjemmescoreProp)
    let bortescoreProp = numberPropTilString(match.away_score)
    const [bortescore, setBortescore] = useState<string>(bortescoreProp)
    const [nyligLagret, setNyliglagret] = useState(false)
    const kampstart = dayjs(match.game_start)

    const lagreCb = () => {
        setNyliglagret(true)
        setTimeout(() => {
            setNyliglagret(false)
        }, 2000)
    }

    const stringTilNumber = (prop: string): number | null => {
        if (prop == '') {
            return null
        }
        return Number(prop!)
    }

    const { mutate, isLoading } = UseMutateMatch(
        match.id,
        stringTilNumber(hjemmescore),
        stringTilNumber(bortescore),
        lagreCb,
    )

    const lagreknappSynlig = (hjemmescore !== hjemmescoreProp || bortescore !== bortescoreProp) && !nyligLagret
    const selectAllFocus = (e: any) => {
        e.target.select()
    }
    return (
        <Card sx={{ mt: 1 }}>
            <CardContent>
                {kampstart.format('ddd, D MMM  HH:mm')}
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={140}> {fixLand(match.home_team)}</Typography>
                    <TextField
                        type="text"
                        error={lagreknappSynlig}
                        variant="standard"
                        inputProps={{
                            inputmode: 'numeric',
                            pattern: '[0-9]*',
                        }}
                        InputProps={{
                            sx: {
                                '& input': {
                                    textAlign: 'center',
                                },
                            },
                        }}
                        sx={{ width: 40 }}
                        value={hjemmescore}
                        onFocus={selectAllFocus}
                        onChange={(e) => {
                            if (!e.currentTarget.value) {
                                setHjemmescore('')
                                return
                            }
                            const number = Number(e.currentTarget.value)
                            if (number >= 0 && number <= 99) {
                                setHjemmescore(String(number))
                            }
                        }}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <Typography width={140}> {fixLand(match.away_team)}</Typography>

                    <TextField
                        type={'text'}
                        variant="standard"
                        inputProps={{
                            inputmode: 'numeric',
                            pattern: '[0-9]*',
                        }}
                        InputProps={{
                            sx: {
                                '& input': {
                                    textAlign: 'center',
                                },
                            },
                        }}
                        error={lagreknappSynlig}
                        sx={{ width: 40 }}
                        value={bortescore}
                        onFocus={selectAllFocus}
                        onChange={(e) => {
                            if (!e.currentTarget.value) {
                                setBortescore('')
                                return
                            }
                            const number = Number(e.currentTarget.value)
                            if (number >= 0 && number <= 99) {
                                setBortescore(String(number))
                            }
                        }}
                    />
                </Box>
                {lagreknappSynlig && (
                    <LoadingButton
                        sx={{ mt: 2 }}
                        variant="contained"
                        onClick={() => {
                            mutate()
                        }}
                        loading={isLoading}
                        endIcon={<SaveIcon />}
                    >
                        Lagre
                    </LoadingButton>
                )}
                <br />

                <Link href={'/match/' + match.id}>
                    <MUILink underline={'hover'} sx={{ cursor: 'pointer' }}>
                        Se alles bets på denne kampen
                    </MUILink>
                </Link>
            </CardContent>
        </Card>
    )
}

export function fixLand(s: string): string {
    return hentFlag(s) + ' ' + hentNorsk(s)
}
