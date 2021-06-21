<template>
     <b-container>
     <h1>О нашем кинотеатре</h1>
     <div class='aboutWrapper'>
          <div class='gridItem'><img src="../static/kalevala_1.jpg" alt="" srcset=""></div>
          <div class='gridItem'><p>
               Современный кинотеатр с огромным экраном и вместительным залом на 400 мест.
               В аппаратной установлено оригинальное оборудование Christie,
               обеспечивающее подачу качественного звука и изображения с новейшей звуковой системой Dolby Atmos.
               В большом зале можно расположиться в комфортабельных креслах, или выбрать уютные диванчики на двоих или на четверых.
               Кафе предлагает большой выбор напитков, десертов, закусок и попкорна. Кстати, попкорн мы готовим несколько раз в день,
               благодаря этому он очень вкусный и всегда свежий! Лучше один раз увидеть, чем сто раз услышать! Ждем вас!
          </p></div>
           
          <div class='gridItem'><p>
               Кинотеатр «Калевала» построен в 1978г., это старейший из ныне действующих кинотеатров в городе.
               Заметка от 6 октября:» Вчера в Петрозаводске состоялось торжество, посвященное сдаче в эксплуатацию
               нового широкоформатного кинотеатра «Калевала». Госкомиссия приняла этот объект с оценкой «хорошо».
               В начале Первомайского проспекта поднялось современное здание с оригинальным фасадом. Здесь два зрительных зала.
               Размеры экрана без малого 20 метров в длину, высота — 9 метров. Впервые в РСФСР в комплекс кинотеатра вошел ресторан». 
          </p></div>
          <div class='gridItem'><img src="../static/kalevala_3.jpg" alt="" srcset=""></div>
          <div class='gridItem'><img src="../static/kalevala_2.jpg" alt="" srcset=""></div>
          <div class='gridItem'><p>
               Фасад здания укарешен пермским стрит-арт-художником Александром Жуневым 
          </p></div>
     </div>
     </b-container>
</template>

<style scoped>
     p {
          padding: 10px;
          background: rgb(241, 241, 241);
          border-radius: 5px;
     }
     h1 {
          text-align: center;
          margin: 20px;
     }
     .gridItem {
          max-width: 500px;
          display: flex;
          justify-content: center;
          align-self: center;
     }
     img {
          width: 100%;
     }
     .aboutWrapper {
          display: grid;
          grid-template-areas: "a a";
     }
     @media (max-width: 960px) {
        .aboutWrapper {
          display: grid;
          grid-template-areas: "a";
        }
        .gridItem {
          max-width: 600px;
        }
      }
</style>