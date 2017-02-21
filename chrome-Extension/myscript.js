		function get_news(paper){
			url = "https://newsapi.org/v1/articles?source=" + paper + "&sortBy=top&apiKey=42103bd5a57d4eaf85bcb821b675c4d3";
			var divNode = document.createElement("div");
			var descTextNode = document.createTextNode("Please wait...");
			divNode.appendChild(descTextNode);
			document.getElementById("mainContent").appendChild(divNode);
			$.getJSON(url, function(result){
				$( "#mainContent" ).empty();
				var count;
				if(result['articles'].length > 7){
					count = 7;
				}
				else{
					count = result['articles'].length;
				}
				for(i=0;i<count;i++){
					//$("div").append(" "+result['articles'][i]['author']);
					var node = document.createElement("li");
					var icon = document.createElement("i");
					icon.className = "glyphicon glyphicon-triangle-right";
					node.appendChild(icon);
					//document.getElementById("mainContent").appendChild(icon);
					var spanNode = document.createElement("span");
					var att1 = document.createAttribute("data-toggle");
					att1.value = "collapse"
					spanNode.setAttributeNode(att1);
					var att2 = document.createAttribute("data-target");
					att2.value = "#"+i
					spanNode.setAttributeNode(att2);
					var textNode = document.createTextNode("  " + result['articles'][i]['title']);
					spanNode.appendChild(textNode);
					var descNode = document.createElement("p");                    
					var att3 = document.createAttribute("id");
					att3.value = i
					descNode.setAttributeNode(att3);
					var att7 = document.createAttribute("style");
					att7.value = "margin-left: 18px;"
					descNode.setAttributeNode(att7);
					descNode.className = "collapse";
					node.appendChild(spanNode);
					node.appendChild(descNode);
					var rowNode = document.createElement("div");
					rowNode.className = "row"
					var x = 0;
					if(result['articles'][i]["urlToImage"] != null){
						var div1Node = document.createElement("div");
						div1Node.className = "col-xs-2"
						var imageNode = document.createElement("img");
						var att4 = document.createAttribute("src");
						att4.value = result['articles'][i]['urlToImage'];
						imageNode.setAttributeNode(att4);
						var att5 = document.createAttribute("height");
						att5.value = "60";
						imageNode.setAttributeNode(att5);
						var att6 = document.createAttribute("width");
						att6.value = "60";
						imageNode.setAttributeNode(att6);
						div1Node.appendChild(imageNode);
						rowNode.appendChild(div1Node);
						x = 1;
					}
					
					var divNode = document.createElement("div");
					if( x == 1){
						divNode.className = "col-xs-10"
					}
					else{
						divNode.className = "col-xs-12"
					}
					var descTextNode = document.createTextNode("   " + result['articles'][i]['description']);
					divNode.appendChild(descTextNode);
					var breakNode = document.createElement("br");
					divNode.appendChild(breakNode);
					var anchorNode = document.createElement("a");
					anchorNode.innerHTML = "Read More";
					anchorNode.href = result['articles'][i]['url'];
					anchorNode.target = "_newtab";
					divNode.appendChild(anchorNode);
					rowNode.appendChild(divNode);
					descNode.appendChild(rowNode);
					document.getElementById("mainContent").appendChild(node);
				}
			}).success(function(){

			}).error(function(){
				$( "#mainContent" ).empty();
				var divNode = document.createElement("div");
				var descTextNode = document.createTextNode("Some Error Found!!");
				divNode.appendChild(descTextNode);
				document.getElementById("mainContent").appendChild(divNode);
			}).complete(function(){
				$('.collapse').on('shown.bs.collapse', function(){
				$(this).parent().find(".glyphicon-triangle-right").removeClass("glyphicon-triangle-right").addClass("glyphicon-triangle-bottom");
				}).on('hidden.bs.collapse', function(){
				$(this).parent().find(".glyphicon-triangle-bottom").removeClass("glyphicon-triangle-bottom").addClass("glyphicon-triangle-right");
				});
				
			});
			
		}
		
		$( document ).ready(function() {
			
			get_news("espn-cric-info");

			$('ul').on('show.bs.collapse','.collapse', function() {
					$('ul').find('.collapse.in').collapse('hide');
			});
			
			$('input:radio[name=paper]').change(function() {
				$( "#mainContent" ).empty();
				get_news(this.value);
			});
		});
		
		
		