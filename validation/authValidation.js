
function authValidate(data) {
   
    if(Object.keys(data).length === 0){
        return  {result:"FAILD", message:"Nothing Passed"}}
    else if(Object.keys(data).length > 3){
        return  {result:"FAILD", message:" You Can't Enter More Than 3 Fields"}}
    else if (!('name' in data) || !('email' in data) || !('password' in data)){
        return  {result:"FAILD", message:"Name / Email / Password Mandatory"}}
    else if(data.name=="" || data.email=="" || data.password==""){
        return  {result:"FAILD", message:"Please Enter Value"}
    }else if (!/^[a-zA-Z ]*$/.test(data.name)){
        return  {result:"FAILD", message:"UserName Must Be a String Format"}
    }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)){
        return {result:"FAILD", message:"Email Must Be in Valid Format"}
    }else if (data.password.length<8){
        return {result:"FAILD", message:"Password Must Be Greater than 8"}
    }else return {result:"PASSED", message:"Succes"}
}

module.exports=authValidate