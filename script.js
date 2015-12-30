(function($)
{ 
	$.fn.puissance4=function(options)
	{     
        //On définit nos paramètres par défaut
        var defauts=
        {
			'nbLignes': 7,	
			'nbColonnes': 7,	
			'player1': "Joueur 1",	
			'player2': "Joueur 2",	
			'colorP1': '#F22613',
			'colorP2': 'yellow'
        };  
       
        //On fusionne nos deux objets ! =D
        var parametres=$.extend(defauts, options);

		var nbGame = 0;

		$("#options").html("<h1>Puissance 4</h1>");
		$("<input id='player1' type='text' maxlength='10' placeholder='Joueur 1' />").insertAfter("h1");
		$("<br><input id='player2' type='text' maxlength='10' placeholder='Joueur 2' />").insertAfter("#player1");
		$("<br><input id='colonnes' type='text' maxlength='1' placeholder='9 colonnes max' />").insertAfter("#player2");
		$("<br><input id='lignes' type='text' maxlength='1' placeholder='7 lignes max' />").insertAfter("#colonnes");
		$("<br><input id='play' type='submit' value='Play' />").insertAfter("#lignes");
		$("<br><input id='replay' type='submit' value='New Partie' />").insertAfter("#play");

		function verif()
		{
			nbLignes = $("#lignes").val(); // Nombre de lignes
			nbLignes = parseInt(nbLignes);
			nbLines = parametres.nbLignes;

			nbColonnes = $("#colonnes").val(); // Nombre de colonnes
			nbColonnes = parseInt(nbColonnes);

			// Dimension du puissance 4
			largeurGame = (nbLignes * 100) + "px";
			hauteurGame = (nbColonnes * 100) + "px";

			firstLetter1 = parametres.player1[7];
			firstLetter2 = parametres.player2[7];
			
			if ($("#player1").val().length > 0 && $("#player2").val().length > 0) 
			{
				if ($("#player1").val() == $("#player2").val()) 
				{
					alert("Veuillez choisir des noms de joueurs différents");
					$("#player1").val(""); 
					$("#player2").val(""); 
					nbGame = 0;
					return false;
				}
			}	

			if ($("#player1").val().length > 0) 
			{
				firstLetter1 = $("#player1").val()[0];
				parametres.player1 = $("#player1").val();
			}

			if ($("#player2").val().length > 0) 
			{
				firstLetter2 = $("#player2").val()[0];
				parametres.player2 = $("#player2").val();
			}

			if (nbLignes > 7 && nbColonnes > 9 || parametres.nbLignes > 7 && parametres.nbColonnes > 9) 
			{
				alert("Nombre maximum de lignes : 7 \n Nombre maximum de colonnes 9");
				$("#lignes").val("");
				$("#colonnes").val("");
				nbGame = 0;
				return false;
			}
			else if (nbLignes > 7 || parametres.nbLignes > 7)
			{
				alert("Nombre maximum de lignes : 7 !");
				$("#lignes").val("");
				nbGame = 0;
				return false;
			}
			else if (nbColonnes > 9 || parametres.nbColonnes > 9)
			{
				alert("Nombre maximum de colonnes 9 !");
				$("#colonnes").val("");
				nbGame = 0;
				return false;
			}

			return true;
		}

		function createGame()
		{

			if (nbLignes > 0 && typeof(nbLignes) === "number" && nbColonnes > 0 && typeof(nbColonnes) === "number") 
			{
				if (nbLignes >= 6 && nbColonnes >= 6) 
				{
					parametres.nbLignes = nbLignes;
					parametres.nbColonnes = nbColonnes;
				}
				else
				{
					alert("Jeu trop petit");
					return false;
				}
			}

			// On crée notre tableau
			$("<table id='game' cellspacing='7'>").insertAfter("#options");

			for (var i = 1; i <= parametres.nbLignes; parametres.nbLignes--) 
			{
				// Création de la ligne
				var tr = $("<tr data-lines=" + parametres.nbLignes + " class=lignes-" + parametres.nbLignes +">").css("background", "#446CB3");
				// Ajout de la ligne au tableau
				var tab = $("#game").append(tr).css("background", "#446CB3");

				for (var j = 1; j <= parametres.nbColonnes; j++) 
				{
					// Création des colonnes et ajout dans la ligne 
					$(".lignes-" + parametres.nbLignes).append("<td class=colonnes-" + parametres.nbLignes + "-" + j + " data-etat=false data-player=>");
				};
			};

			$("<p id=turnToPlay>").insertAfter("#game");
		}

		function getInfo()
		{
			// au click je récupère la class du td et celle du parent -> le tr
			myCol = $(td).attr("class"); // "colonne-1-5"
			// myRow = $(td).parent().attr("class"); // "lignes-5"

			// je récupère le chiffre de la class "colonnes-1-5"
			numCol = myCol.split("-"); 
			numCol = numCol[1] + "-" + numCol[2]; // 1-5
			numCol1 = numCol[1]; // id de lignes -> 1
			numCol2 = numCol[2]; // id de colonnes -> 5
		}

		function putToken()
		{
			for (numeroLigne = 1; numeroLigne <= nbLines; numeroLigne++)
			{
				tdPlayer = $("." + "colonnes-" + numeroLigne + "-" + numCol2);
				etatPlayer = $("." + "colonnes-" + numeroLigne + "-" + numCol2).data("etat");

				if (etatPlayer == false)
				{
					if (idPlayer == 1) 
					{
						$(tdPlayer).data({"etat": "true", "player": idPlayer}).html(firstLetter1).css("background", parametres.colorP1);
				
						if (horizonWin(idPlayer) || verticalWin(idPlayer)) 
						{
							$("#turnToPlay").html(parametres.player1 + " vainqueur de cette partie").css({"color": parametres.colorP1, "font-weight": "bold"});
							idPlayer = 0;
							break;	
						}
						else
						{
							idPlayer = 2;
							$("#turnToPlay").html("Au tour de " + parametres.player2).css({"color": parametres.colorP2, "font-weight": "bold"});
							break;	
						}
					}
					else if (idPlayer == 2)
					{
						$(tdPlayer).data({"etat": "true", "player": idPlayer}).html(firstLetter2).css("background", parametres.colorP2);

						if (horizonWin(idPlayer) || verticalWin(idPlayer)) 
						{
							$("#turnToPlay").html(parametres.player2 + " vainqueur de cette partie").css({"color": parametres.colorP2, "font-weight": "bold"});
							idPlayer = 0;
							break;	
						}
						else
						{
							idPlayer = 1;
							$("#turnToPlay").html("Au tour de " + parametres.player1).css({"color": parametres.colorP1, "font-weight": "bold"});
							break;	
						}
					}
				}
			};
		}

		function horizonWin(idPlayer)
		{
			if (idPlayer == 1) 
			{
				parametres.player = parametres.player1;
			}
			else if (idPlayer == 2)
			{
				parametres.player = parametres.player2;
			}

			var win = 0;

			for(var zz = 1; zz <= parametres.nbColonnes; zz++)
			{
				if ($(".colonnes-" + numeroLigne + "-" + zz).data("player") === idPlayer) 
				{
					win++;
					if (win == 4) 
					{
						alert(parametres.player +" à gagné");
						return true;
					}
				}
				else
				{
					win = 0;
				}
			}
		}

		function verticalWin(idPlayer)
		{
			if (idPlayer == 1) 
			{
				parametres.player = parametres.player1;
			}
			else if (idPlayer == 2)
			{
				parametres.player = parametres.player2;
			}

			var win = 0;

			for(var zz = 1; zz <= nbLines; zz++)
			{
				if ($(".colonnes-" + zz + "-" + numCol2).data("player") === idPlayer) 
				{
					win++;
					if (win == 4) 
					{
						alert(parametres.player +" à gagné");
						return true;
					}
				}
				else
				{
					win = 0;
				}
			}
		}

		// function diagonalWin(idPlayer)
		// {
		// 	var win = 0;
		// 	var pos1 = numeroLigne;
		// 	var pos2 = numCol2;

		// 	for(var zz = 1; zz <= nbLines; zz++)
		// 	{
		// 		if ($(".colonnes-" + zz + "-" + numCol2).data("player") === idPlayer) 
		// 		{
		// 			win++;
		// 			if (win == 4) 
		// 			{
		// 				alert("Joueur "+ idPlayer +" à gagné");
		// 				return true;
		// 			}
		// 		}
		// 		else
		// 		{
		// 			win = 0;
		// 		}
		// 	}
		// }

		$("#play").click(function()
		{
			if (nbGame == 0) 
			{
				nbGame = 1;
				idPlayer = 1;

				if (verif() ) 
				{
					createGame();
				};


				$("td").click(function() 
				{
					td = this;
					getInfo();

					putToken();
				});
			};
		});
	
		$("#replay").click(function()
		{
			location.reload();
		});	
	};
})(jQuery);

$("#options").puissance4();