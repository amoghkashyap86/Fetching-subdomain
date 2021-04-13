import axios from 'axios'
export const fetchData=(domain)=>{
    const userPromise=fetchUser(domain);
    return{
        user:wrap(userPromise)
    }
}
const fetchUser=(domain)=>{
    console.log("fetching")
    return axios.get(`https://subbuster.cyberxplore.com/api/find?domain=${domain}
    `)
    .then(res=> res.data)
    .catch(err=> console.log("error"))
}
const wrap=(promise)=>{
    let status='pending';
    let result
    let suspender=promise.then(
        res=>{
            status='success'
            result=res
        },err=>{
            status='error'
            result=err;
        }
    )
    return {
        read(){
            if(status==='pending'){
                throw suspender
            }else if(status==='error'){
                throw result
            }else if(status==='success'){
                return  result
            }
        }
    }
}