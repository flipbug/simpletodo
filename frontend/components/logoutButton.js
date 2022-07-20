import Router from "next/router";
import useSWR, { useSWRConfig } from 'swr'
import fetchJson from "../lib/fetchJson";

export default function LogoutButton() {

    const { mutate } = useSWRConfig();

    async function onClick() {

        mutate("/api/user", await fetchJson("/api/logout", {
            method: "POST",
        }));

        Router.push("/");
    }

    return <a href="#" onClick={onClick}>Logout</a>;
}
