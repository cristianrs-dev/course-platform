/*MENU MOBILE*/
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('close-btn');
   
    if(openBtn){
        openBtn.addEventListener('click', () => {
            sidebar.classList.add('show');
           
        });
    }

    if(closeBtn){
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('show');
            
        });

    }

    
});