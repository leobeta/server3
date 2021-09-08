export default {
  jwtSecret: process.env.JWT_SECRET || 'somesecrettoken',
  DB: {
    URI: process.env.MONGODB_URI || "mongodb+srv://iukdb:ZT5DXjdqPDE3mfD@iuk.l2olv.mongodb.net/iukdb?retryWrites=true&w=majority",
    USER: process.env.MONGODB_USER || 'iukdb',
    PASSWORD: process.env.MONGODB_PASSWORD || 'ZT5DXjdqPDE3mfD'
  }
}
