import { fetcher } from "@/api/fetcher"
import useSWR from "swr"

export const useGetCurrencies = () => {
    const {data} = useSWR('https://api.coingecko.com/api/v3/simple/supported_vs_currencies',fetcher)

    return data
}