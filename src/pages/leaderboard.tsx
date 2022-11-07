import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { UseLeaderboard } from '../queries/useLeaderboard'
import { Container } from '@mui/system'
import { Spinner } from '../components/loading/Spinner'
import { UseAllBets } from '../queries/useAllBets'

function plassVisning(plass: number) {
    switch (plass) {
        case 1:
            return '🥇'
        case 2:
            return '🥈'
        case 3:
            return '🥉'
    }
    return plass
}

const Leaderboard: NextPage = () => {
    const { data, isLoading } = UseLeaderboard()
    const { data: d2, isLoading: l2 } = UseAllBets()
    if (!data || isLoading) {
        return <Spinner />
    }
    return (
        <>
            <Head>
                <title>Leaderboard</title>
            </Head>
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <Container maxWidth="md">
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Plass</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Navn</TableCell>
                                    <TableCell align="right">Poeng</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, i) => (
                                    <TableRow
                                        key={row.userid}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">
                                            <Typography variant="h2"> {plassVisning(i + 1)}</Typography>
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.picture && (
                                                <Image
                                                    src={row.picture}
                                                    alt={row.name}
                                                    width={'40vw'}
                                                    height={'40vw'}
                                                />
                                            )}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.score}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </>
    )
}

export default Leaderboard
