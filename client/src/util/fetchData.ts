
export default () => {
    let data:any = null;
    return async function fetchData(){
        if (data === null){
            let res = await fetch("/api/getData")
            data = await res.json();
        }
        return data;
    }
}