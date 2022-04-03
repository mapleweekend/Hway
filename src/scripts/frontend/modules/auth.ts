export var isUserLoggedIn = false
export var currentUsername = null
export var currentUserID = null

export const getUser = async () => {
    const response = await fetch('/api/get/currentuser/')
    const data = await response.json()
    
    try {
        if (data.code == 400) { // Error code for 'no user logged in' or 'invalid JWT token'
            isUserLoggedIn = false;
            currentUsername = null
            localStorage.clear()
        } else {
            console.log("test")
            currentUserID = data.id
            currentUsername = data.name
            isUserLoggedIn = true
            localStorage.setItem("currentUsername", currentUsername!)
            
            const response = await fetch('/api/get/user/'+data.name+'/show_nsfw');
            const data2 = await response.json();
            let filter_nsfw = document.getElementById('filter_nsfw') as HTMLInputElement;
            if (data2.show_nsfw == true) {
                filter_nsfw.checked = true;
            }
            else {
                filter_nsfw.checked = false;
            }
            
        }    
    } catch(err) {
        console.error(err)
    }

    console.log(isUserLoggedIn, currentUsername, currentUserID)
}