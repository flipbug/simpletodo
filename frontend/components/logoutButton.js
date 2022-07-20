import Router from "next/router";
import callUrl from "../lib/callUrl";

export default function LogoutButton() {

    async function onClick() {

        const { result, error } = await callUrl(
            "/api/logout",
            "POST");

        Router.push("/");
    }

    return <a href="#" onClick={onClick}>Logout</a>;
}
