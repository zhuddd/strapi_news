
export default {
    routes: [
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/profile/:id',
            handler: 'profile.img',
        },
        { // Path defined with a URL parameter
            method: 'GET',
            path: '/profile',
            handler: 'profile.me',
        }
    ]
}

