"use strict";
const start = () => {

    let currentIndex = 0;
    function showSlide(index) {
        const slides = document.querySelector('.slides');
        const lengthT = document.querySelectorAll('.slide');
        currentIndex = index % lengthT.length;
        const offset = currentIndex * lengthT[0].clientWidth; 
        slides.style.transform = `translateX(${offset}px)`;
    }
    function startSlider() {
        showSlide(currentIndex);
        setInterval(() => {
            currentIndex++;
            showSlide(currentIndex);
        }, 5000);
    }
    startSlider();
    const buy = document.getElementById("buy");

    async function fetchData(){
        const url1 = 'https://dummyjson.com/products';
        const url2 = 'https://dummyjson.com/products/search?q=phone';
        const url3 = 'https://dummyjson.com/products/search?q=laptop';


        try{
            const response1 = await Promise.all([fetch(url1),fetch(url2),fetch(url3)]);

            const data1 = await response1[0].json();
            const data2 = await response1[1].json();
            const data3 = await response1[2].json();
 

            const bestSelling = data1.products;
            const smartDevices = [...data2.products, ...data3.products];

            const titles = ["کالای پر فرش","کالای هوشمند"];
            let indexTitles = 0;

            const salesSection = [bestSelling,smartDevices];

            salesSection.forEach((a)=>{
                const section = document.createElement("div");
                section.classList.add("section");
                const title = document.createElement("h1");
                title.innerText =titles[indexTitles];
                indexTitles += 1
                section.appendChild(title);
                const categorys = [];
                a.forEach((e)=>{
                    const category = e.category;
                    categorys.push(category);
                });
                const newCategorys = [...new Set (categorys)];
                newCategorys.forEach((c)=>{
                    const parent = document.createElement("div");
                    const parentTitle = document.createElement("h2");
                    parent.classList.add("parent")
                    parentTitle.innerText = c.toUpperCase();
                    parent.appendChild(parentTitle);

                    const category  = document.createElement("div");
                    category.classList.add("category");
                    
                    parent.appendChild(category);

                    a.forEach((card)=>{
                        if(card.category === c){
                            const product = document.createElement("div");
                            const svg = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="shopping icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M17 17h-11v-14h-2" /><path d="M6 5l14 1l-1 7h-13" /></svg>`
                            product.className = "card";
                            product.style.alignContent= "space-between"
                            product.innerHTML = `
                            <div><img  src="${card.images[0]}"></img></div>
                            <p>${card.title}</p>
                            <div class="cardtext">
                            <p class="rate">${card.rating}%</p>
                            <div class="buy">
                            <p>${card.price}$</p>
                            ${svg}
                            </div>
                            </div>
                                       
                        `
                          category.appendChild(product);
                        }
                    });
                    const previousbtn = document.createElement("button");
                    previousbtn.classList.add("previousbtn");
                    previousbtn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 6l6 6l-6 6" /></svg>`
                    previousbtn.addEventListener("click",()=>{
                    category.scrollLeft += 300;
                });
                    const nextBtn = document.createElement("button");
                     nextBtn.classList.add("nextbtn");
                    nextBtn.innerHTML = `<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-chevron-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg>`
                    nextBtn.addEventListener("click",()=>{
                    category.scrollLeft -= 300;
                });
                parent.appendChild(previousbtn);
                parent.appendChild(nextBtn);

                const mouseDown = (e)=>{
                    let startX =-e.clientX;
                    
                    const handleMove = (e)=>{
                        let deltaX = -e.clientX - startX ;
                        category.scroll(category.scrollLeft + deltaX,0);
                    }
                    const handleMouseUp = ()=>{
                        document.removeEventListener("mousemove",handleMove);
                        document.removeEventListener("mousemove",handleMouseUp);
                    }

                    document.addEventListener("mousemove",handleMove);
                    document.addEventListener("mouseup",handleMouseUp);
                }
                
                category.addEventListener("mousedown",mouseDown);
                    section.appendChild(parent);
                })

                buy.appendChild(section);

            })       
            
            const svg = document.querySelectorAll(".icon-tabler-shopping-cart");
            const shop= document.querySelectorAll(".numberProduct");
            let numberOfItems = 0
                svg.forEach((s)=>{
                    s.addEventListener("click",()=>{
                        numberOfItems++
                        shop.forEach((s)=>{
                            s.style.display = "inline-block";
                            s.textContent = numberOfItems;   
                        })
                        const parentElement= s.parentNode.parentNode.parentNode;
                    });
                });
 
        }catch(er){
            console.error("Error fetching data",er);
        }
    }
    fetchData()
  
};
window.addEventListener('load', start);
