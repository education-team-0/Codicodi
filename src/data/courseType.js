export default {
    data:['JAVA SpringMVC','Python','C++'],
    getNRandomNumber:function(num) {
    const numArray=['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let nums=""
    for(let i=0;i<num;++i){
        nums+=numArray[Math.floor(Math.random()*36)]
    }
    return nums
}
}