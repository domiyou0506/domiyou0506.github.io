'use strict';
// 엄격하게 확인하겠다.
// 변수, 문법을 좀더 엄격하게 사용하는 모드
// 틀리면 에러발생









// 스크롤에 따른 메뉴바 색상처리 
const navbar =document.querySelector('#navbar');
// Document.querySelector() : 문서 내 첫 번째 Element를 반환/ 일치하는 요소가 없으면 null을 반환
// #navbar 의 요소가 존재하는지 반환 
const navbarHeight = navbar.getBoundingClientRect().height;
// Element.getBoundingClientRect() 메서드:   엘리먼트의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환
// height : 높이 정보
// => 상대높이 정보를 반환 
console.log(navbarHeight);
// => 상대높이 정보 출력

document.addEventListener('scroll',()=>{
// addEventListener가 특정 이벤트 발생 시 특정 함수를 실행
// removeEventListener는 등록된 이벤트리스너를 지우는 역할
    // change : 변동이 있을 때 발생 
    // click : 클릭시 발생 
    // focus : 포커스를 얻었을 때 발생
    // keydown : 키를 눌렀을 때 발생 
    // keyup : 키에서 손을 땟을 때 발생 
    // load : 로드가 완료 되었을 때 발생 
    // mousedown : 마우스를 클릭 했을 때 발생
    // mouseout : 마우스가 특정 객체 밖으로 나갔을 때 발생 
    // mouseover : 마우스가 특정 객체 위로 올려졌을 때 발생 
    // mousemove : 마우스가 움직였을 때 발생 
    // mouseup : 마우스에서 손을 땟을 때 발생 
    // select : option 태그 등에서 선택을 햇을 때 발생 

    // console.log('이벤트가 발생합니다.');


    // console.log(window.scrollY);
// Window.scrollY : Window 인터페이스의 scrollY 읽기 전용 속성은 문서가 수직으로 얼마나 스크롤됐는지 픽셀 단위로 반환


    // .navbar--bold 클래스는 존재하지 않는다. => 스크롤을 내리면 콘솔에서 자동적으로 생성
    // classList가  .navbar--bold 클래스를 만들던 지우던 하는 역할
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--bold');
    }else{
        navbar.classList.remove('navbar--bold');
    }
});






// 스크롤에 따른 메뉴바 고정
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e)=>{
    // console.log(e);
    const target = e.target;
    const link = target.dataset.link;
    if(link==null){
        return;
    }
    // console.log(link);
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
});






// 모바일 메뉴 버튼 설정
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', ()=>{
    navbarMenu.classList.toggle('open');
})

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'}); 
}








//'연락주세요' 버튼 클릭시 맨아래 하단 contact로 가기
// 스크롤에 따른 메뉴바 고정
const homecontactBtn = document.querySelector('.home__contact');
homecontactBtn.addEventListener('click', ()=>{
    scrollIntoView('#contact');
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}








// 화살표를 누르면 홈으로 
const home =document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=>{
    if(window.scrollY > homeHeight/2){
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
    home.style.opacity = 1-window.scrollY/homeHeight;
});

arrowUp.addEventListener('click', ()=>{
    scrollIntoView('.home__container')
})

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}









// 프로젝트의 카테고리 버튼을 누르면 해당 카테고리만 보이기
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    }

    const active = document.querySelector('.category__btn.selected');
    if(active != null){
        active.classList.remove('selected');
    }
    e.target.classList.add('selected');

    projectContainer.classList.add('anim-out');
    setTimeout(() => {
        projects.forEach((project) => {
            console.log(project.dataset.type);
            if(filter === '*' || filter === project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({ behavior: 'smooth' });
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}






// 베열화
const sectionIds = [
    '#home',
    '#about',
    '#skills',
    '#work',
    '#textimonials',
    '#contact'
];

// 하나씩 배열로 저장된다.
const sections =sectionIds.map((id) => document.querySelector(id));
// console.log(sections);
const navItems = sectionIds.map((id) => document.querySelector(`[data-link="${id}"]`));
// console.log(navItems);

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');
}

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3
}

const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            console.log('y');
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            // console.log(index);
            if(entry.boundingClientRect.y < 0){
                selectedNavIndex = index + 1;
            }else{
                selectedNavIndex = index - 1;
            }
            console.log(selectedNavIndex);
        }
    });
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    }else if(
        window.scrollY + window.innerHeight === document.body.clientHeight
    ) {
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});