var dog,dogim1,dogim2;
var foodS,foodStock;
var database;
var fedTime,lastFed;
var food;
var addFoodB,feedB;

function preload()
{
  dogim1 = loadImage("images/dogImg.png");
  dogim2 = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog = createSprite(250,350,10,10);
  dog.addImage("dimg",dogim1);
  dog.scale = 0.2;




  food = new Food();
  

  


  feedB = createButton("Feed the Dog");
  feedB.position(650,95);
  feedB.mousePressed(feedDog);

  addFoodB = createButton("Add Food");
  addFoodB.position(750,95);
  addFoodB.mousePressed(addFood);


}


function draw() 
{  
  background(46,139,87);

  food.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  /*if(keyWentDown(UP_ARROW))
  {
    writeStock(foodS);
    dog.addImage("dimg",dogim2);
  }
  */

  

  textSize(15);
  fill(255,255,254);
  if(lastFed>=12)
  {
    text("Last Fed:" + lastFed%12 + " PM",350,30);
  }
  
   else if(lastFed==0)
   {
     text("Last Fed: 12 AM",350,30);
   }

   else
   {
     text("Last Fed:" + lastFed + " AM",350,30)
   }

  drawSprites();

}




function readStock(data)
{
  foodS = data.val();
  food.updateFoodStock(foodS);
}


/*function writeStock(x)
{

   if(x<=0)
   {
     x=0;
   }
   else
   {
     x=x-1;
   }


  database.ref('/').update({
      Food:x
    })
}
*/

function feedDog()
{
  dog.addImage("dimg",dogim2);

  food.updateFoodStock(food.getFoodStock()-1);
  database.ref('/').update({
    Food:food.getFoodStock(),
    FeedTime:hour()
  })
}


function addFood()
{
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}
