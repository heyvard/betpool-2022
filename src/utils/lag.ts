interface Lag {
    engelsk: string
    norsk: string
    flagg: string
}

export const alleLag: Lag[] = [
    { engelsk: 'Argentina', norsk: 'Argentina', flagg: 'ð¦ð·' },
    {
        engelsk: 'Australia',
        norsk: 'Australia',
        flagg: 'ð¦ðº',
    },
    { engelsk: 'Belgium', norsk: 'Belgia', flagg: 'ð§ðª' },
    {
        engelsk: 'Brazil',
        norsk: 'Brasil',
        flagg: 'ð§ð·',
    },
    { engelsk: 'Cameroon', norsk: 'Kamerun', flagg: 'ð¨ð²' },
    {
        engelsk: 'Canada',
        norsk: 'Canada',
        flagg: 'ð¨ð¦',
    },
    { engelsk: 'Costa Rica', norsk: 'Costa Rica', flagg: 'ð¨ð·' },
    {
        engelsk: 'Croatia',
        norsk: 'Kroatia',
        flagg: 'ð­ð·',
    },
    { engelsk: 'Denmark', norsk: 'Danmark', flagg: 'ð©ð°' },
    {
        engelsk: 'Ecuador',
        norsk: 'Equador',
        flagg: 'ðªð¨',
    },
    { engelsk: 'England', norsk: 'England', flagg: 'ð´ó §ó ¢ó ¥ó ®ó §ó ¿' },
    {
        engelsk: 'France',
        norsk: 'Frankrike',
        flagg: 'ð«ð·',
    },
    { engelsk: 'Germany', norsk: 'Tyskland', flagg: 'ð©ðª' },
    {
        engelsk: 'Ghana',
        norsk: 'Ghana',
        flagg: 'ð¬ð­',
    },
    { engelsk: 'Iran', norsk: 'Iran', flagg: 'ð®ð·' },
    {
        engelsk: 'Japan',
        norsk: 'Japan',
        flagg: 'ð¯ðµ',
    },
    { engelsk: 'Korea Republic', norsk: 'SÃ¸r Korea', flagg: 'ð°ð·' },
    {
        engelsk: 'Mexico',
        norsk: 'Mexico',
        flagg: 'ð²ð½',
    },
    { engelsk: 'Morocco', norsk: 'Marokko', flagg: 'ð²ð¦' },
    {
        engelsk: 'Netherlands',
        norsk: 'Nederland',
        flagg: 'ð³ð±',
    },
    { engelsk: 'Poland', norsk: 'Polen', flagg: 'ðµð±' },
    {
        engelsk: 'Portugal',
        norsk: 'Portugal',
        flagg: 'ðµð¹',
    },
    { engelsk: 'Qatar', norsk: 'Qatar', flagg: 'ð¶ð¦' },
    {
        engelsk: 'Saudi Arabia',
        norsk: 'Saudi Arabia',
        flagg: 'ð¸ð¦',
    },
    { engelsk: 'Senegal', norsk: 'Senegal', flagg: 'ð¸ð³' },
    {
        engelsk: 'Serbia',
        norsk: 'Serbia',
        flagg: 'ð·ð¸',
    },
    { engelsk: 'Spain', norsk: 'Spania', flagg: 'ðªð¸' },
    {
        engelsk: 'Switzerland',
        norsk: 'Sveits',
        flagg: 'ð¨ð­',
    },
    {
        engelsk: 'Tunisia',
        norsk: 'Tunisia',
        flagg: 'ð¹ð³',
    },
    { engelsk: 'Uruguay', norsk: 'Uruguay', flagg: 'ðºð¾' },
    {
        engelsk: 'USA',
        norsk: 'USA',
        flagg: 'ðºð¸',
    },
    { engelsk: 'Wales', norsk: 'Wales', flagg: 'ð´ó §ó ¢ó ·ó ¬ó ³ó ¿' },
]

const engelskMap = new Map<string, Lag>()
const norsk = new Map<string, Lag>()

alleLag.forEach((l) => {
    engelskMap.set(l.engelsk, l)
    norsk.set(l.norsk, l)
})

export function hentFlag(engelskLag: string) {
    return engelskMap.get(engelskLag)?.flagg || 'ð¤'
}

export function hentNorsk(engelskLag: string) {
    return engelskMap.get(engelskLag)?.norsk || 'ð¤'
}

export const alleLagSortert = alleLag.sort((a, b) => a.norsk.localeCompare(b.norsk))
