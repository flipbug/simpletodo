import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import callUrl from "../../lib/callUrl";

export default withIronSessionApiRoute(todoRoute, sessionOptions);

async function todoRoute(req, res) {
    if (req.session.user) {
        const { result, error } = await callUrl(
            "http://backend:8000/api/todos/",
            "GET",
            req.session.user.token.access);

        res.json(result);

    } else {
        res.json([]);
    }
}