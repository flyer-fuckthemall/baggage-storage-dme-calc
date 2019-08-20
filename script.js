let calc = () => {
//Назначение переменных
  let firstTime = document.forms.time.firstTime.value;//значение поля ввода начальных даты и времни
  let secondTime = document.forms.time.secondTime.value;//значение поля ввода конечных даты и времени
  let baggage = Number(document.forms.time.baggage.value);//значение поля ввода количества багажа
  let clothes = Number(document.forms.time.clothes.value);//значение поля ввода количества одежды
  let resultBaggage;//хранит итоговую стоимость хранения багажа
  let resultClothes;//хранит итоговую стоимость хранения одежды
  let difference = 0;//разница во времени
  let clothesCost = 300//стоимость хранения 1 кофра одежды за 1 календарный день
  let less = 300;//стоимость хранения 1 места багажа, если менее 3 часов
  let more = 600;//стоимость хранения 1 места багажа, если более 3 часов
  let before = 300;//стоимость 1 дня хранения, если багажа сдан в 21:00
  let after = 5;//стоимость хранения 1 минуты первые 1.5 часа после 00:00
  
//Назначение переменных отдельных значений: минуты, часы, дни, месяцы, год
  //Для поля ввода начальных даты и времни
  let firstTM = Number(firstTime.slice(14));
  let firstTH = Number(firstTime.slice(11,13));
  let firstD = Number(firstTime.slice(8,10));
  let firstM = Number(firstTime.slice(5,7));
  let firstY = Number(firstTime.slice(0,4));
  
  //Для поля ввода конечных даты и времни
  let secondTM = Number(secondTime.slice(14));
  let secondTH = Number(secondTime.slice(11,13));
  let secondD = Number(secondTime.slice(8,10));
  let secondM = Number(secondTime.slice(5,7));
  let secondY = Number(secondTime.slice(0,4));
  
// создание объектов Date для полей ввода дат и времени
  let first = new Date(firstTime);
  let last = new Date(secondTime);
  
//Проверка если до 1 календарного дня
  if(firstY === secondY && firstM === secondM && firstD === secondD){
    difference = (last - first)/1000/60;
    resultClothes = clothesCost*clothes;
    if(difference <= 180){
      resultBaggage = less*baggage;
      // document.forms.time.result.value = result;
    }
    else {
      resultBaggage = more*baggage;
    }
  }
//------------------------------end------------------------------
  
//Проверка если больше одного календарного дня
  if(firstY !== secondY || firstM !== secondM || firstD !== secondD){
    difference = Math.ceil((last-first)/1000/60/60/24);
    if(secondTH<=firstTH && secondTM>=firstTM){
      difference++;
    }
    resultClothes = clothesCost*difference*clothes;
     if(difference <= 30) {
       resultBaggage = difference*more*baggage;
       if(difference >= 6 && difference <= 30) {
         resultBaggage = (6*more+(difference-6)*less)*baggage;
       }
     } else {
      resultBaggage = 'Вы не можете хранить багаж более, чем 30 дней';
      resultClothes = 'Вы не можете хранить одежду более, чем 30 дней';
     }
  }
//------------------------------end------------------------------  
  
//Проверка, если багаж сдан после 21:00 и хранится от 2 до 6 дней включительно  
  if (firstTH>=21 && secondD>firstD){
    resultBaggage-=less*baggage;
  }
//------------------------------end------------------------------  
  
//Проверка если багаж получен в первые 1.5 часа после 00:00 и багаж хранился до 6 дней включительно  
  if (secondTH<=1 && secondTM <=30 && secondD>firstD && difference<=6){
    resultBaggage-=(more-(secondTH*90+secondTM)*5)*baggage;
  }
//------------------------------end------------------------------   
  document.forms.time.resultBaggage.value = resultBaggage;//отправка результата в поле стоимости хранения багажа
  document.forms.time.resultClothes.value = resultClothes;//отправка результата в поле стоимости хранения одежды
  document.forms.time.resultTotal.value = resultClothes + resultBaggage;//отправка результата в поле суммарной стоимости хранения
}
