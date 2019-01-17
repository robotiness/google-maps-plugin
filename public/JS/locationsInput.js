	function Location(title,address,link,phoneNumber,place,position){
		this.title=title;
		this.address=address;
		this.link=link;
		this.phoneNumber=phoneNumber;
		this.placeId=place;
		this.position=position;
};
var locations=[];
var location1=new Location("Loation 1",null,null,null,0,{lat:34.132853,lng:-118.5316293});
locations.push(location1);
var location1=new Location("Loation 2",null,null,null,1,{lat:34.132853,lng:-117.5316293});
locations.push(location1);
var location1=new Location("Loation 3",null,null,null,2,{lat:35.132853,lng:-118.5316293});
locations.push(location1);
var location1=new Location("Loation 4",null,null,null,3,{lat:34.232853,lng:-118.7316293});
locations.push(location1);
var location1=new Location("Loation 5",null,null,null,4,{lat:34.4553,lng:-117.6316293});
locations.push(location1);
//loadLocations->addInputs->add->delete->loadLocations->addInputs->add->delete->loadLocations
//contentOrDesign
window.onload = function() {
	loadLocations(function(){
		console.log("started")
	});
}

function loadLocations(callback)
{
	var scrollDiv=document.querySelectorAll(".scrollDiv")[0];
	var container=document.querySelectorAll(".btnContainer");
	for(var i=0;i<container.length;++i)
	{
		container[i].remove();
	}
	for(var i=0;i<locations.length;++i)
	{
		locations[i].placeId=i;
	}


	for(var i=0;i<locations.length;++i)
	{
		scrollDiv.insertAdjacentHTML('beforeend',`
		<div class='col-lg-12 padding-left-30 padding-right-30 btnContainer padding-top-20' id=`+locations[i].placeId+`>
			<div class='col-lg-1 clickable' id=`+locations[i].placeId+` >
				<i class='fas fa-map-marker-alt'></i>
			</div>
			<div class='col-lg-6 clickable' id=`+locations[i].placeId+`>
				<p style='margin-bottom: 0px;'>`+locations[i].title+`</p>
			</div>
			<div class='col-lg-1'>
				<form id='deleteForm`+locations[i].placeId+`+' method='post' action='/delete'>
					<i class='myTrash fas fa-trash-alt' id='`+locations[i].placeId+`'></i>
					<input type='text' name='locationPlaceId' style='display:none' value='`+locations[i].placeId+`'>
				</form>
			</div>
			<div class='col-lg-4 clickable' id=`+locations[i].placeId+`>
				<i style='float:right' class='fas fa-arrow-circle-right '></i>
			</div>
		</div>`);
	}
	var btnContainer=document.querySelectorAll('.btnContainer');
	btnContainer[btnContainer.length-1].scrollIntoView();
	callback(addInputs(function(){
		console.log("started add inputs");
	}));
	initMap();
}
function addInputs(callback)
{
	var locationBtn=document.querySelectorAll(".clickable");
	console.log(locationBtn.length);
	var trashBtn=document.querySelectorAll(".myTrash");
	for(let i=0;i<locationBtn.length;++i)
	{
		let button=locationBtn[i];

		button.addEventListener("click",function(){
			var positionSlide=document.getElementById("location");
			positionSlide.style.display="none";
			var editLocationSlide=document.getElementById("editLocation");
			editLocationSlide.style.display="block";

			//fill in the inputs
			var titleInput=document.getElementsByName("title")[0];
			var placeIdInput=document.getElementsByName("place")[0];
			titleInput.value=locations[this.id].title;
			placeIdInput.value=locations[this.id].placeId;


		});
	}
	callback(addLocation(function(){
		console.log("started addLocation");
	}));
}
function addLocation(callback)
{
	var addBtn=document.querySelectorAll(".addLocationBtn")[0];


	addBtn.addEventListener("click",function(){
	var table=document.querySelectorAll(".btnContainer");
	var endOfTable=table[table.length-1];
	var textNode="Location "+(table.length+1);
	var randomNum=Math.floor((Math.random() * 10000) + 1);
	var num="34"+randomNum;
	var randomNum=Math.floor((Math.random() * 10000) + 1);
	var num2="-117"+randomNum;
	num2=Number(num2/10000);
	num=Number(num/10000);
	var newLocation=new Location(textNode,null,null,null,table.length,{lat:num,lng:num2});

	locations.push(newLocation);

	endOfTable.insertAdjacentHTML( 'afterend',`
		<div class='col-lg-12 padding-left-30 padding-right-30 btnContainer padding-top-20' id=`+table.length+`>
			<div class='col-lg-1 clickable' id=`+table.length+` >
				<i class='fas fa-map-marker-alt'></i>
			</div>
			<div class='col-lg-6 clickable' id=`+table.length+`>
				<p style='margin-bottom: 0px;'>`+textNode+`</p>
			</div>
			<div class='col-lg-1'>
				<form id='deleteForm`+table.length+`' method='post' action='/delete'>
					<i class='myTrash fas fa-trash-alt' id='`+table.length+`'></i>
					<input type='text' name='locationPlaceId' style='display:none' value='`+table.length+`'>
				</form>
			</div>
			<div class='col-lg-4 clickable' id=`+table.length+`>
				<i style='float:right' class='fas fa-arrow-circle-right '></i>
			</div>
		</div>`);
	endOfTable.scrollIntoView();
	initMap();

		callback(deleteBtn(function(){
			console.log("started deleteBtn");
		}));

	});
	callback(deleteBtn(function(){
			console.log("started deleteBtn");
		}));

}
function deleteBtn(callback)
{
	var deleteBtn=document.querySelectorAll(".myTrash");
	for(var i=0;i<deleteBtn.length;++i)
	{
		deleteBtn[i].addEventListener("click",function(){
			var clickContainer=document.querySelectorAll(".btnContainer");
			if(clickContainer.length>1)
			{
				console.log(locations);
				
				for(var i=0;i<clickContainer.length;++i)
				{

					if(clickContainer[i].id==this.id)
					{
						console.log("before Delete");
						console.log(locations);
						locations=updateArray(locations,this.id);
						console.log("after Delete");
						console.log(locations);
						var container=document.querySelectorAll(".btnContainer");
						callback(loadLocations(function(){
							console.log("started loadLocations");
						}));
					}
				}

			}
		});
	}
}
function updateArray(array,deleteIndex)
{
	var newArray=[];
	for(var i=0;i<array.length;++i)
	{
		if(i!=deleteIndex)
		{
			newArray.push(array[i]);
		}
	}
	return newArray;
}
function contentOrDesign(){
	var content=document.getElementById('contentBtn');
	var design=document.getElementById('designBtn');

//click content
content.addEventListener("click",function(){


	//fadeInContent();
	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");
	var editLocation=document.getElementById("editLocation");

	contentSide.style.display="block";
	designSide.style.display="none";
	editLocation.style.display="none";

	if(this.classList.contains('selected')==false)
	{

		this.classList.add('selected');
		var design=document.getElementById('designBtn');
		design.classList.remove('selected');

	}

});

//click design
design.addEventListener("click",function(){

	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");

	contentSide.style.display="none";
	designSide.style.display="block";
	editLocation.style.display="none";

	if(this.classList.contains('selected')==false)
	{
		this.classList.add('selected');
		this.classList.add('fadeInRight');
		var content=document.getElementById('contentBtn');
		content.classList.remove('selected');

	}
});

}
/*function Location(title,address,link,phoneNumber){
		this.title=title;
		this.address=address;
		this.link=link,
		this.phoneNumber=phoneNumber;

		this.getAddress=function(){
			return this.address;
		}

};

var locations=[];
var location1=new Location("location 1",null,null,null);
locations.push(location1);
var location1=new Location("location 2",null,null,null);
locations.push(location1);



window.onload = function() {
	loadLocations();
	addInputs();
	deleteBtn();
	add();
	contentOrDesign();
}

function deleteBtn()
{
	var trashBtn=document.querySelectorAll('.myTrash');
	for(var i=0;i<trashBtn.length;++i)
	{
		trashBtn[i].addEventListener('click',function(){
			var id=this.parentElement.id;
			var form=document.getElementById(id);
			form.submit();
		});
	}

}
function loadLocations()
{
	var scrollDiv=document.querySelectorAll(".scrollDiv")[0];


	for(var i=0;i<locations.length;++i)
	{

		scrollDiv.insertAdjacentHTML('beforeend',``);

	}
}
function contentOrDesign(){
	var content=document.getElementById('contentBtn');
	var design=document.getElementById('designBtn');

//click content
content.addEventListener("click",function(){


	//fadeInContent();
	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");
	var editLocation=document.getElementById("editLocation");

	contentSide.style.display="block";
	designSide.style.display="none";
	editLocation.style.display="none";

	if(this.classList.contains('selected')==false)
	{

		this.classList.add('selected');
		var design=document.getElementById('designBtn');
		design.classList.remove('selected');

	}

});

//click design
design.addEventListener("click",function(){

	var designSide=document.getElementById("design");
	var contentSide=document.getElementById("location");

	contentSide.style.display="none";
	designSide.style.display="block";
	editLocation.style.display="none";

	if(this.classList.contains('selected')==false)
	{
		this.classList.add('selected');
		this.classList.add('fadeInRight');
		var content=document.getElementById('contentBtn');
		content.classList.remove('selected');

	}
});

}

function add(){
	var addBtn=document.querySelectorAll(".addLocationBtn")[0];


	addBtn.addEventListener("click",function(){
	var table=document.querySelectorAll(".btnContainer");
	var endOfTable=table[table.length-1];
	var textNode="Location "+(table.length+1);
	var newLocation=new Location(textNode,null,null,null,(table.length+1));

	locations.push(newLocation);

	endOfTable.insertAdjacentHTML( 'afterend',`<div class='col-lg-12 padding-left-30 padding-right-30 btnContainer padding-top-20'>
						<div class='col-lg-1 clickable' >
							<i class='fas fa-map-marker-alt'></i>
						</div>
						<div class='col-lg-6 clickable'>
							<p style='margin-bottom: 0px;'>location `+(table.length+1)+`</p>
						</div>
						<div class='col-lg-1'>
							<form id='deleteForm`+table.length+`' method='post' action='/delete'>
								<i class='myTrash fas fa-trash-alt'></i>
								<input type='text' name='locationId' style='display:none' value='`+locations[table.length].title+`'>
							</form>
						</div>
						<div class='col-lg-4 clickable'>
							<i style='float:right' class='fas fa-arrow-circle-right '></i>
						</div>
					</div>`);


	endOfTable.scrollIntoView();
	deleteBtn();
	addInputs();


	});
	
}

function addInputs()
{
	var locationBtn=document.querySelectorAll(".clickable");
	var index=locationBtn.length/3;
	console.log(locationBtn.length);
	var trashBtn=document.querySelectorAll(".myTrash");
	for(let i=0;i<locationBtn.length;++i)
	{
		let button=locationBtn[i];
		button.addEventListener("click",function(){
			var positionSlide=document.getElementById("location");
			positionSlide.style.display="none";
			var editLocationSlide=document.getElementById("editLocation");
			editLocationSlide.style.display="block";

			//fill in the inputs
			var titleInput=document.getElementsByName("title")[0];
			var placeIdInput=document.getElementsByName("place")[0];
			//IMPORTANT NEED TO FILL THE FIRST FIVE WITH THE OBJECT.SERVER SIDE
			
			var found=false;
			for(var i=0;i<locations.length;++i)
			{
				if(this.getAttribute('value')==locations[i].placeId)
				{
					found=true;
					titleInput.value=locations[i].title;
				}
			}
			if(!found)
			{
				alert("No matches errror");
			}
		});
	}

}*/

