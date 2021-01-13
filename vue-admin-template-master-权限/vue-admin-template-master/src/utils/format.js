import moment from 'moment'

export function formatTime(dataStr) {
    return moment(dataStr).format("YYYY-MM-DD HH:mm:ss");
}
//注意：js代码和ts代码不同，js代码没有类型声明，是任意类型，需要在tsconfig.json中进行配置
// "noImplicitAny":false,

