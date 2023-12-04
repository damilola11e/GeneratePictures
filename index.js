const BtnEl=document.getElementById('btn');
const errorMessageEl=document.getElementById("errorMessage");
const galleryEl=document.getElementById('gallery');

BtnEl.addEventListener('click', fetchImage);

async function fetchImage(){
    const inputValue=document.getElementById("input").value;
    if (inputValue > 10 || inputValue < 1 ){
        errorMessageEl.style.display="block";
        errorMessageEl.innerText="Number should be between 0 and 11, Please Try Again"
        return
    }

    let imgs="";
    try {
        BtnEl.style.display='none'
        const loading=`<img src="spinner.svg"/>`
        galleryEl.innerHTML=loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random()* 1000)}&client_id=mhuABPR7xb--3fQK8RLmHgF_tOGBJdB3_U8LJnxytro`).then((res)=>res.json().then((data)=>{
        if (data){
            data.forEach((pic) => {
                imgs+=`<img src=${pic.urls.small} alt="image"/>`
                galleryEl.style.display="block";
                galleryEl.innerHTML=imgs;
                BtnEl.style.display="block";
            });
        }
    }));
        errorMessageEl.style.display="none"
        
    } catch (error) {
        errorMessageEl.style.display='none'
        errorMessageEl.innerText='An Error has occured , Please try again later'
        BtnEl.style.display="block";
        galleryEl.style.display="none";
    }
   
}