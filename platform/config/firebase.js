module.exports = ({env}) => {
    const serviceAccount = env.json('GOOGLE_APPLICATION_CREDENTIALS')
    const database = env('FIREBASE_DATABASE_URL')
    return {
        database,
        serviceAccount
    }
}