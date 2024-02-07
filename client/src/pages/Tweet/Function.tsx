
export const updateLike = async (route: string) => {
    const token= localStorage.getItem("token");

    const response: Response = await fetch('http://localhost:3001/api/v1/tweets/'+ route,
    {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
    if (!response.ok) {
        console.log(response);
        
    }
    const res =await response.json();

    console.log(res);
    
    return res
};
