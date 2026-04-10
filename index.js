let selected_tab_index = 0;
const data_map = {
    'Rosehill Roundabout': [
        {
            'title': 'Turning from St Helier Avenue towards Reigate and M25',
            'image': 'Rosehill from st helier av to m25.jpeg',
            'video': 'https://www.youtube.com/embed/TkpgcCE-an0'
        },
        {
            'title': 'Turning from St Helier Avenue towards Sutton',
            'image': 'Rosehill st helier av to sutton.jpeg',
            'video': 'https://www.youtube.com/embed/H8FKMTIc5UA'           
        },
        {
            'title': 'Turning from Bishopsford Road towards Sutton',
            'image': 'Rosehill from bishopsford road to sutton.jpeg',
            'video': 'https://www.youtube.com/embed/Ty70VtpKNug'            
        },
        {
            'title': 'Turning from Rose Hill towards St. Helier Avenue',
            'image': 'Rose Hill to St Helier Avenue.png',
            'video': 'https://www.youtube.com/embed/OqWAsnIHnzg'  
        },
        {
            'title': 'Turning from Green Lane towards Reigate and M25',
            'image': 'RosehillGreenLaneToReigateAv.png',
            'video': 'https://www.youtube.com/embed/2JbtDTvbXUo'
        },
        {
            'title': 'Work station',
            'image': 'Rosehill_with_markings.png'
        }
    ],
    'Morden Hall Roundabout': [
        {
            'title': 'Turning from St. Helier Avenue to Morden Road',
            'image': 'mordenhall roundabout to croydon.jpeg',
            'video': 'https://www.youtube.com/embed/M58sEARvNn8'
        },
        {
            'title': 'Turning from Morden Road to Morden Hall Road',
            'image': 'mordenhall roundabout to central london.jpeg',
            'video': 'https://www.youtube.com/embed/uuJaIpd42WA'           
        },
        {
            'title': 'Turning from Central Road to St. Helier Avenue',
            'image': 'mordenhall roundabout to m25.jpeg',
            'video': 'https://www.youtube.com/embed/VZrueQsI7BU'           
        },
        {           
            'title': 'Turning from Morden Hall Road to Central Road',
            'image': 'toNorthCheam.png',
            'video': 'https://www.youtube.com/embed/fGVy0HCafg0'
        }
    ],
    'Morden Road Roundabout': [
        {
            'title': 'London Road to Morden Hall Road',
            'image': 'MordenRoundabout1.jpg', 
            'video': 'https://www.youtube.com/embed/Jl5YnIF5CiI'           
        },
        {
            'title': 'Morden Hall Road to Morden Road',
            'image': 'MordenRoundabout3.png'           
        },
        {
            'title': 'Morden Hall Road to Morden Road using Left Lane',            
            'video': 'https://www.youtube.com/embed/QxhfjBafMJ8'           
        },
        {
            'title': 'Morden Hall Road to Morden Road using Right Lane',            
            'video': 'https://www.youtube.com/embed/Vjde8-TdlgA'
        }
    ]
}
const menu = document.querySelector('#menu');
const content = document.querySelector('#content');
const app_bar_title = document.querySelector('#app_bar_title');
const menu_icon = document.querySelector('#menu_icon');
const drop_list = document.querySelector('#drop_list');

set_up_menu_items();
set_up_drop_down_list();
update_content();

function set_up_menu_items() {
    const menu_items = Object.keys(data_map);
    
    for (let i = 0; i < menu_items.length; i++){
        let item_text = menu_items[i];
        let menu_item = document.createElement('div');
        menu_item.classList.add('menu_item');
        if (i == selected_tab_index) {
            menu_item.classList.add('selected');
        }
        menu_item.innerText = item_text;
        menu.appendChild(menu_item);
    }

    //set up menu click listener
    menu.addEventListener('click', e => {      
       
        if(e.target.classList.contains('menu_item')){           
            //get selected index
            const key = e.target.innerText;
            selected_tab_index = Object.keys(data_map).indexOf(key);
            
            manage_selection();
            
            //update content page
            update_content();  
            
        }       
    });
}

function set_up_drop_down_list(){
    const menu_items = Object.keys(data_map);
    for (let i = 0; i < menu_items.length; i++){
        let item_text = menu_items[i];
        let menu_item = document.createElement('div');
        menu_item.classList.add('drop_list_item');
        menu_item.innerText = item_text;
        drop_list.appendChild(menu_item);
    }

    //click listener
    drop_list.addEventListener('click', e => {       
        if(e.target.classList.contains('drop_list_item')){
            const key = e.target.innerText;
            //get selected index
            selected_tab_index = Object.keys(data_map).indexOf(key);
            manage_selection();
            //update content page
            update_content();
        }
    })

}

function update_content(){
    /*
        <iframe width="1280" height="960" allowfullscreen src="https://www.youtube.com/embed/TkpgcCE-an0">
        </iframe>
    */

    content.innerHTML = ''; 
    const selected_data_key = Object.keys(data_map)[selected_tab_index];
    const selected_data = data_map[selected_data_key];
    app_bar_title.innerHTML = selected_data_key;
 
    for(let i = 0; i < selected_data.length; i++){
        const title_text = selected_data[i]['title'];
        const image_text = selected_data[i]['image'];
        const video_text = selected_data[i]['video'];

        const div = document.createElement('div');
        div.classList.add('content-item');    
        
        if(title_text){
            const title = document.createElement('div');           
            title.innerText = title_text;
            title.classList.add('title');           
            div.append(title);            
           
        }
    
        if(image_text){
            const image = document.createElement('img');            
            image.setAttribute("src", 'images/' + image_text);  
            image.classList.add('image');       
            div.append(image);
        }

        if(video_text){
            const video = document.createElement('iframe');
            video.setAttribute('src', video_text);
            video.setAttribute('allowFullScreen', '');
            video.classList.add('video');
            div.append(video);
        }
        content.appendChild(div);
    }
   
}

function manage_selection(){
    //remove selection
    for (let i = 0; i < menu.children.length; i++) {
        let menu_item =  menu.children[i];
        menu_item.classList.remove('selected');
    }
    //set selected
    menu.children[selected_tab_index].classList.add('selected');
}

// click listener for menu icon
window.addEventListener('click', e => {    
    if (e.target.getAttribute('id') == 'menu_icon'){
        drop_list.style.display = 'block';        
    } else {
        drop_list.style.display = 'none';        
    }
});

window.addEventListener("blur", () => {
  const iframe = document.querySelector("iframe");
  if (document.activeElement === iframe) {
    drop_list.style.display = 'none';
  }
});

