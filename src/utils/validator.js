
export const validateMovie = movieInfo =>{
    const {title, storyLine, language, releaseDate, status, type, genres,
    tags, cast} = movieInfo;

    if(!title.trim()) return {error: 'Title is missing!'}
    if(!storyLine.trim()) return {error: 'Story line is missing!'}
    if(!language.trim()) return {error: 'Language is missing!'}
    if(!releaseDate.trim()) return {error: 'Release date is missing!'}
    if(!status.trim()) return {error: 'Status is missing!'}
    if(!type.trim()) return {error: 'Type is missing!'}

    // Validation for genres, we are checking ig genres is an array or not
    if(!genres.length) return {error: "Genres are missing!"}
    // we are checking genres need to be string values
    for(let gen of genres){
        if(!gen.trim()) return {error: 'invalid genres!'}
    }

    if(!tags.length) return {error: "Tags are missing!"}
    for(let gen of tags){
        if(!gen.trim()) return {error: 'invalid tags!'}
    }

    if(!cast.length) return {error: "Cast and crew are missing!"}
    for(let c of cast){
        if(typeof c !== 'object') return {error: 'invalid cast!'}
    }

    return {error: null}
}
