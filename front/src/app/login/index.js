import React, { Component } from 'react';

export default class Secret extends Component {
    function Login () {
        const [
            redirectToReferrer,
            setRedirectToReferrer
        ] = React.useState(false)

        const { state } = useLocation()
        const login = () => fakeAuth.authenticate(() => {
            setRedirectToReferrer(true)
        })

        if (redirectToReferrer === true) {
            return <Redirect to={state?.from || '/'} />
        }

        return (
            <div>
                Login
            </div>
        )
    }
}