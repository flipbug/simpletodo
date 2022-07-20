import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req, res) {
    const { username, password } = await req.body;

    try {
        const user = await authenticateUser(username, password)
        if (user){
            req.session.user = user;
            await req.session.save();
            res.json(user);
        } else {
            res.status(400).json({ message: "Credentials denied. Please try again" });
        }

    } catch (error) {
        res.status(500).json({ message: (error).message });
    }
}

async function authenticateUser(username, password) {

    const res = await fetch("http://backend:8000/api/token/",
        {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: { "Content-Type": "application/json" }
        })

    const token = await res.json()

    // If no error and we have user data, return it
    if (res.ok && token) {
        return {
            name: username,
            isLoggedIn: true,
            token: token
        }
    }
}
