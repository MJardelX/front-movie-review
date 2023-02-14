
export const isValidEmail = (email) => {
    const isValidEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/

    return isValidEmail.test(email)
};



export const getToken = () => localStorage.getItem('auth-token');



export const catchError = (error) => {

    const { response } = error;
    if (response?.data) {
        return response.data;
    }
    return { "error": error.message || error }
}


export const renderItem = (result => {
    return (
        <div key={result.id} className='flex space-x-2 rounded overflow-hidden'>
            <img src={result.avatar} alt={result.name} className="w-12 h-12 rounded object-cover" />
            <p className='dark:text-white text-primary font-semibold'>{result.name}</p>
        </div>
    )
})



export const getPoster = (posters = []) => {
    const {length} = posters;

    if(!length) return null;

    if(length>2) return posters[1];

    return posters[0];
}


export const convertReviewCount = (count = 0) => {
    if (count <= 999) return count;

    return parseFloat(count / 1000).toFixed(2) + "k"
}