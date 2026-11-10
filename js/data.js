/* Petit à Petit — contenus (français, bienveillants) */
var PAP = window.PAP = window.PAP || {};

PAP.MESSAGES = [
  "Aujourd'hui, un tout petit pas suffit. Vous n'avez rien à prouver.",
  "Votre corps vous accompagne depuis toujours. Un merci discret, ça compte déjà.",
  "Ce n'est pas une course. C'est un chemin, et vous avancez à votre rythme.",
  "Un verre d'eau, une grande respiration : voilà une belle façon de commencer.",
  "Une journée imparfaite n'efface rien. Vous êtes toujours en chemin.",
  "La régularité douce va plus loin que les grands élans suivis d'un arrêt.",
  "Vous avez le droit d'y aller lentement. Lentement, c'est une vitesse tout à fait honorable.",
  "Ce matin, choisissez la bienveillance. Elle n'est jamais superflue.",
  "Bouger un peu, c'est déjà beaucoup. Le reste peut attendre.",
  "Vous n'êtes pas en retard. Vous êtes ici, maintenant, et c'est un très bon point de départ.",
  "Écouter sa faim, c'est déjà une forme d'écoute de soi.",
  "Repos et mouvement sont alliés, pas ennemis.",
  "Si la balance est capricieuse, ce n'est pas un verdict. C'est une donnée parmi d'autres.",
  "Prenez une minute pour relâcher les épaules. Oui, maintenant, c'est le bon moment.",
  "Vous n'avez pas à tout réussir aujourd'hui. Un geste gentil envers vous suffit.",
  "Les petits rituels construisent les grandes constances.",
  "Marcher, même dix minutes, c'est offrir de l'air à vos pensées.",
  "Votre valeur ne se mesure ni en kilos, ni en tour de taille.",
  "Une rechute n'est pas un échec. C'est une information, et le chemin continue.",
  "Buvez, respirez, avancez. Dans cet ordre, si vous voulez.",
  "Aujourd'hui, visez le « assez bien ». C'est souvent le plus durable.",
  "Faites de la place pour le plaisir à table. Il a toute sa légitimité.",
  "Votre énergie varie, et c'est humain. Adaptez le programme à la journée, pas l'inverse.",
  "Bravo d'être là. Ouvrir l'appli, c'est déjà un geste pour vous.",
  "Le plus courageux n'est pas d'en faire trop : c'est de recommencer, simplement.",
  "Un étirement doux peut changer le ton d'une après-midi.",
  "Vous apprenez à vous connaître. C'est un travail précieux, pas un détour.",
  "Gardez la même gentillesse pour vous que celle que vous auriez pour un ami.",
  "Le sommeil est un allié discret. L'honorer, c'est avancer aussi.",
  "Rien n'est cassé. Même après un écart, le prochain repas est une nouvelle page.",
  "Célébrez les jours ordinaires. Ce sont eux qui font le chemin.",
  "Une douleur n'est pas un défi à relever : c'est un signal à respecter.",
  "Vous pouvez ajuster votre objectif. Un cap réaliste est un cap plus solide.",
  "L'eau, la marche, un vrai repas : trois piliers simples, déjà très beaux.",
  "Il n'y a pas de « rattrapage » à faire. Seulement la suite, plus douce.",
  "Sourire à votre effort, même minuscule, le rend plus léger.",
  "Les plateaux arrivent. Ils ne signifient pas que vous stagnez en tant que personne.",
  "Demander de l'aide à un médecin, un proche, un professionnel, c'est une force.",
  "Aujourd'hui, posez un mot sur votre humeur. L'accueillir, c'est déjà beaucoup.",
  "Moins de jugement, plus de curiosité : « De quoi ai-je besoin, là, maintenant ? »",
  "Un programme trop dur ne dure pas. Un programme trop doux peut, lui, s'installer.",
  "Vous avez déjà traversé beaucoup de journées difficiles. Celle-ci aussi passera.",
  "Mettez une chanson, ouvrez la fenêtre, bougez un peu. Le moral suit parfois le mouvement.",
  "Le corps n'est pas un projet à punir. C'est une maison à habiter plus confortablement.",
  "Si vous ne pouvez faire qu'une chose : choisissez celle qui vous fera du bien sans vous épuiser.",
  "La constance n'est pas la perfection. C'est revenir, encore, sans drame.",
  "Notez ce qui va bien, même tout petit. Le regard change, parfois, juste avec ça.",
  "Les comparaisons volent l'énergie. Votre seul repère utile, c'est vous, il y a une semaine.",
  "Un bon repas simple vaut mieux qu'un plan trop compliqué abandonné.",
  "Prenez l'escalier… ou pas. L'important, c'est de ne pas vous humilier pour un choix pratique.",
  "La honte n'aide pas à changer. La douceur, souvent, si.",
  "Offrez-vous une pause sans écran, trois minutes. Votre souffle est toujours là.",
  "Vous n'êtes pas « à la ramasse ». Vous êtes un humain, avec des hauts et des bas.",
  "Avancer un tout petit peu suffit. Multiplié par des jours, cela devient une autre vie, tout doucement.",
  "Si c'est lourd aujourd'hui, baissez la barre. Continuer petit, c'est encore continuer.",
  "Préparer un plat simple, c'est une façon concrète de vous dire : « je compte ».",
  "Les trophées sont amusants, mais le vrai trésor, c'est le respect que vous vous construisez.",
  "Personne n'a besoin que vous soyez parfait. Présent, c'est déjà très beau.",
  "Ce soir, remerciez-vous pour un geste, un seul. Puis allez vous reposer.",
  "Demain n'exige rien pour l'instant. Aujourd'hui, vous êtes déjà en train de prendre soin de vous."
];

PAP.EXERCICES = [
  {
    id: "marche-place",
    nom: "Marche sur place",
    cat: "marche",
    niveau: "doux",
    duree: 8,
    materiel: "Aucune, éventuellement un appui (chaise, mur).",
    pour: "S'échauffer chez soi, sans pression.",
    etapes: [
      "Tenez-vous debout, près d'un appui si vous le souhaitez.",
      "Levez légèrement un pied, puis l'autre, comme une marche tranquille.",
      "Gardez le dos long, les épaules relâchées, les genoux souples.",
      "Respirez tranquillement. Vous devez pouvoir parler en marchant.",
      "Après quelques minutes, ralentissez puis arrêtez-vous en douceur."
    ],
    securite: "Allez à votre rythme. En cas d'essoufflement important, de vertige ou de douleur, arrêtez-vous et asseyez-vous. Les chaussures fermées sont plus confortables que les chaussons glissants."
  },
  {
    id: "marche-10",
    nom: "Petite marche de 10 minutes",
    cat: "marche",
    niveau: "doux",
    duree: 10,
    materiel: "Chaussures confortables.",
    pour: "Prendre l'air sans se fixer un défi.",
    etapes: [
      "Choisissez un trajet plat et connu (autour de l'immeuble, un square, un couloir).",
      "Partez à une allure où vous pouvez discuter.",
      "Si besoin, prévoyez un banc à mi-chemin pour une pause.",
      "Au retour, buvez un peu d'eau et notez simplement : « c'est fait »."
    ],
    securite: "Adaptez le parcours à vos articulations et à la météo. Inutile de viser une distance. La régularité compte plus que la performance."
  },
  {
    id: "marche-20",
    nom: "Marche de 20 minutes à votre rythme",
    cat: "marche",
    niveau: "moyen",
    duree: 20,
    materiel: "Chaussures confortables, une bouteille d'eau.",
    pour: "Allonger tout doucement le temps de marche, quand 10 minutes passent bien.",
    etapes: [
      "Échauffez-vous 2 minutes : marche très lente, cercles d'épaules.",
      "Marchez 16 minutes à une allure confortable. Vous pouvez parler.",
      "Les 2 dernières minutes, ralentissez progressivement.",
      "Étirez mollets et avant des cuisses sans forcer, en vous tenant si besoin."
    ],
    securite: "Augmentez la durée seulement si la séance précédente s'est bien passée. La douleur n'est pas un objectif. En cas de douleur thoracique, arrêtez et consultez."
  },
  {
    id: "marche-pauses",
    nom: "Marche avec pauses (intervalles doux)",
    cat: "marche",
    niveau: "moyen",
    duree: 16,
    materiel: "Un parcours plat, éventuellement un banc.",
    pour: "Varier sans jamais sprinter.",
    etapes: [
      "Alternez 2 minutes de marche un peu plus vive (toujours capable de parler) et 2 minutes très lentes.",
      "Répétez ce cycle 4 fois.",
      "Terminez par une minute encore plus calme.",
      "Asseyez-vous un instant avant de reprendre votre journée."
    ],
    securite: "« Un peu plus vive » ne veut pas dire courir. Si l'essoufflement dépasse le confort, restez à l'allure lente. C'est déjà une belle séance."
  },
  {
    id: "assis-debout",
    nom: "Assis-debout sur une chaise",
    cat: "chaise",
    niveau: "doux",
    duree: 6,
    materiel: "Une chaise stable, sans roulettes, dossier contre un mur si possible.",
    pour: "Renforcer les jambes en toute sécurité, utile au quotidien.",
    etapes: [
      "Asseyez-vous au bord de la chaise, pieds à plat, écartés comme le bassin.",
      "Penchez légèrement le buste, poussez dans les talons et levez-vous.",
      "Redescendez lentement, avec contrôle, jusqu'à vous rasseoir.",
      "Faites 6 à 10 mouvements, reposez-vous, recommencez 1 ou 2 fois si vous vous sentez bien.",
      "Vous pouvez aider avec les accoudoirs ou un appui : ce n'est pas « tricher »."
    ],
    securite: "Ne bloquez pas la respiration. Arrêtez si les genoux, les hanches ou le dos protestent. Une amplitude plus petite est tout à fait bienvenue."
  },
  {
    id: "jambes-assis",
    nom: "Extensions de jambes assis",
    cat: "chaise",
    niveau: "doux",
    duree: 6,
    materiel: "Une chaise stable.",
    pour: "Travailler les cuisses sans se mettre au sol.",
    etapes: [
      "Asseyez-vous le dos contre le dossier, pieds à plat.",
      "Tendez une jambe vers l'avant, pied flexible, sans claquer le genou.",
      "Maintenez 3 secondes, redescendez doucement.",
      "Alternez les jambes, 8 à 12 fois de chaque côté."
    ],
    securite: "Gardez le dos appuyé. Si un genou est sensible, réduisez l'amplitude ou restez à la teneur sans aller au bout."
  },
  {
    id: "marche-assise",
    nom: "Marche assise (genoux qui se lèvent)",
    cat: "chaise",
    niveau: "doux",
    duree: 5,
    materiel: "Une chaise stable.",
    pour: "Faire circuler le sang et échauffer les hanches, même les jours de faible énergie.",
    etapes: [
      "Asseyez-vous bien droit, mains sur les cuisses ou sur le bord de la chaise.",
      "Levez un genou un peu, reposé, puis l'autre, comme une marche.",
      "Trouvez un rythme régulier et confortable pendant 1 à 2 minutes.",
      "Faites une pause, recommencez si vous le souhaitez."
    ],
    securite: "Ne forcez pas la hauteur du genou. Si vous avez mal au bas du dos, réduisez le mouvement et gardez le bas du dos calme."
  },
  {
    id: "bras-assis",
    nom: "Élévations des bras assis",
    cat: "chaise",
    niveau: "doux",
    duree: 5,
    materiel: "Une chaise. Bouteilles d'eau optionnelles comme poids très légers.",
    pour: "Mobiliser épaules et respiration.",
    etapes: [
      "Asseyez-vous, pieds à plat, épaules basses.",
      "Inspirez en montant les bras sur les côtés, jusqu'où c'est confortable (épaule, ou un peu plus).",
      "Expirez en redescendant lentement.",
      "Répétez 8 à 12 fois. Vous pouvez aussi monter les bras vers l'avant."
    ],
    securite: "En cas de conflit d'épaule ou de douleur, restez dans une petite amplitude. N'allez pas derrière la tête si cela pince."
  },
  {
    id: "epaules",
    nom: "Rotations d'épaules",
    cat: "mobilite",
    niveau: "doux",
    duree: 4,
    materiel: "Aucune. Possible assis ou debout.",
    pour: "Dénouer le haut du dos, souvent crispé.",
    etapes: [
      "Relâchez les bras le long du corps.",
      "Faites de grands cercles très lents d'épaules, vers l'arrière, 8 fois.",
      "Puis 8 cercles plus petits vers l'avant.",
      "Terminez en ouvrant la poitrine sur une inspiration, sans cambrer trop."
    ],
    securite: "Mouvement lent, sans à-coups. Arrêtez si une douleur irradie dans le bras."
  },
  {
    id: "nuque",
    nom: "Mobilité douce de la nuque",
    cat: "mobilite",
    niveau: "doux",
    duree: 4,
    materiel: "Assis de préférence.",
    pour: "Soulager les tensions du cou, sans jamais forcer.",
    etapes: [
      "Regardez droit devant, épaules lourdes.",
      "Inclinez l'oreille droite vers l'épaule droite, revenez au centre, puis l'autre côté. 4 fois.",
      "Tournez doucement la tête à droite, puis à gauche, comme pour dire « non » tout lentement.",
      "Posez le menton un peu vers la poitrine, puis revenez. Pas de cercle complet si cela vous gêne."
    ],
    securite: "Pas de mouvements brusques, pas de rotation forcée. En cas de vertige, de douleur cervicale connue ou de hernie, demandez conseil à un professionnel et restez sur des amplitudes minuscules."
  },
  {
    id: "chat-assis",
    nom: "Dos rond, dos long (version assise)",
    cat: "mobilite",
    niveau: "doux",
    duree: 5,
    materiel: "Une chaise sans accoudoirs de préférence.",
    pour: "Mobiliser la colonne en restant assis, alternative au « chat-vache » au sol.",
    etapes: [
      "Asseyez-vous sur les ischions (les os des fesses), pieds à plat, mains sur les cuisses.",
      "Expirez : basculez le bassin, arrondissez le dos, regardez un peu le sol.",
      "Inspirez : redressez-vous, ouvrez légèrement la poitrine, regard à l'horizon.",
      "Répétez 8 à 10 fois, tout en souplesse."
    ],
    securite: "Restez dans une amplitude agréable. Si vous avez mal au dos, réduisez le mouvement ou arrêtez."
  },
  {
    id: "inclinaisons",
    nom: "Inclinaisons latérales douces",
    cat: "mobilite",
    niveau: "doux",
    duree: 4,
    materiel: "Assis ou debout près d'un mur.",
    pour: "Étirer les flancs et mieux respirer.",
    etapes: [
      "Une main sur la hanche, l'autre monte le long de l'oreille si c'est confortable.",
      "Inclinez le buste quelques centimètres vers le côté de la hanche.",
      "Respirez 2 fois dans ce flanc, revenez au centre.",
      "Changez de côté. 4 fois de chaque."
    ],
    securite: "Ne partez pas en avant ni en arrière. Petite amplitude. Évitez si une douleur de hanche ou de dos apparaît."
  },
  {
    id: "pont",
    nom: "Pont fessier au lit ou au sol",
    cat: "renforcement",
    niveau: "moyen",
    duree: 6,
    materiel: "Un lit ferme ou un tapis. Un oreiller sous la tête si besoin.",
    pour: "Renforcer l'arrière des cuisses et les fessiers, précieux pour se lever.",
    etapes: [
      "Allongez-vous sur le dos, genoux pliés, pieds à plat écartés comme le bassin.",
      "Expirez, poussez dans les talons, décollez le bassin à une hauteur confortable.",
      "Gardez 2 à 3 secondes, redescendez vertèbre après vertèbre.",
      "Faites 6 à 10 répétitions, une pause, éventuellement une deuxième série."
    ],
    securite: "Si descendre au sol est difficile, faites l'exercice sur le lit. Ne cambriez pas le bas du dos. En cas de douleur lombaire, restez plus bas ou choisissez un exercice sur chaise."
  },
  {
    id: "gainage-mur",
    nom: "Gainage debout contre le mur",
    cat: "renforcement",
    niveau: "doux",
    duree: 5,
    materiel: "Un mur dégagé.",
    pour: "Activer le centre du corps sans se mettre à plat ventre.",
    etapes: [
      "Placez-vous face au mur, un pas en arrière, mains à hauteur de poitrine contre le mur.",
      "Rentrez un peu le bas-ventre, comme pour fermer un jean, sans bloquer le souffle.",
      "Gardez le corps aligné 15 à 30 secondes, puis relâchez.",
      "Répétez 3 à 5 fois. Pour un cran de plus, éloignez un peu les pieds."
    ],
    securite: "Les poignets doivent rester confortables. Si le mur vous semble trop dur, rapprochez-vous. Pas de retenue de souffle."
  },
  {
    id: "pompes-mur",
    nom: "Pompes contre le mur",
    cat: "renforcement",
    niveau: "doux",
    duree: 5,
    materiel: "Un mur.",
    pour: "Renforcer bras, épaules et poitrine en version très accessible.",
    etapes: [
      "Pieds à 40–60 cm du mur, mains un peu plus larges que les épaules.",
      "Fléchissez les coudes, approchez la poitrine du mur.",
      "Poussez pour revenir, sans verrouiller les coudes.",
      "6 à 12 répétitions, 1 à 2 séries."
    ],
    securite: "Gardez le corps d'une pièce. Si les poignets gênent, rapprochez-vous ou posez les avant-bras. Douleur d'épaule = on arrête ou on réduit."
  },
  {
    id: "chevilles",
    nom: "Cercles de chevilles et pointes-talons",
    cat: "mobilite",
    niveau: "doux",
    duree: 4,
    materiel: "Assis, idéalement.",
    pour: "Préparer la marche et soulager les jambes.",
    etapes: [
      "Asseyez-vous, soulevez un pied légèrement.",
      "Tracez 8 cercles lents dans un sens, 8 dans l'autre.",
      "Puis, pieds au sol : levez les orteils (poids sur les talons), puis les talons (poids sur l'avant-pied), 12 fois.",
      "Changez de pied pour les cercles."
    ],
    securite: "Mouvement fluide. En cas de gonflement important, de douleur de mollet soudaine ou de problème veineux connu, parlez-en à un médecin avant d'insister."
  },
  {
    id: "coussin",
    nom: "Serrage d'un coussin entre les genoux",
    cat: "renforcement",
    niveau: "doux",
    duree: 5,
    materiel: "Un coussin souple, une chaise.",
    pour: "Travailler l'intérieur des cuisses, utile pour la stabilité.",
    etapes: [
      "Asseyez-vous, coussin entre les genoux, pieds à plat.",
      "Serrez doucement 5 secondes, relâchez 5 secondes.",
      "Répétez 8 à 10 fois, sans bloquer la respiration."
    ],
    securite: "Le serrage est ferme mais jamais douloureux. Arrêtez si une douleur de hanche ou de pubis apparaît."
  },
  {
    id: "aqua-marche",
    nom: "Aquagym : marche dans l'eau",
    cat: "aquagym",
    niveau: "doux",
    duree: 15,
    materiel: "Piscine où vous avez pied, ou niveau d'eau à la taille / la poitrine.",
    pour: "Bouger avec le soutien de l'eau, souvent plus confortable pour les articulations.",
    etapes: [
      "Entrez dans l'eau progressivement, habituez-vous à la température.",
      "Marchez d'avant en arrière, puis latéralement, 8 à 15 minutes.",
      "Ajoutez de grands mouvements de bras dans l'eau, sans forcer les épaules.",
      "Terminez par quelques respirations calmes, accroché au bord si besoin."
    ],
    securite: "Ne pratiquez pas seul si vous n'êtes pas à l'aise dans l'eau. Évitez les zones hors d'appui si vous n'êtes pas nageur. Attention aux marches glissantes. Demandez un avis médical en cas de problème cardiaque, cutané ou d'oreille."
  },
  {
    id: "aqua-bras",
    nom: "Aquagym : bras et équilibre au bord",
    cat: "aquagym",
    niveau: "doux",
    duree: 10,
    materiel: "Piscine, bord ou ligne d'eau.",
    pour: "Travailler le haut du corps avec la résistance naturelle de l'eau.",
    etapes: [
      "Debout, de l'eau jusqu'à la poitrine si possible, un pied stable.",
      "Poussez l'eau vers l'avant puis vers vous avec les deux mains, 10 fois.",
      "Ouvrez et fermez les bras à l'horizontale, 10 fois.",
      "Option : levez un genou, posez-le, alternez, en vous tenant au bord."
    ],
    securite: "Gardez un appui proche. Sortez de l'eau lentement, attention à la tension artérielle et au vertige en sortant. Hydratez-vous même dans l'eau."
  },
  {
    id: "respiration",
    nom: "Respiration et relâchement",
    cat: "mobilite",
    niveau: "doux",
    duree: 5,
    materiel: "Une chaise ou le bord du lit.",
    pour: "Clore une séance, ou simplement se poser un jour difficile.",
    etapes: [
      "Asseyez-vous confortablement, pieds à plat, mains sur le ventre.",
      "Inspirez par le nez en sentant le ventre se soulever un peu, 4 secondes.",
      "Expirez par la bouche, plus long, 6 secondes, épaules qui descendent.",
      "Répétez 8 à 10 cycles. Les pensées peuvent passer, ce n'est pas grave."
    ],
    securite: "Ne forcez pas le souffle. Si la respiration profonde vous donne le tournis, revenez à un rythme naturel."
  }
];

PAP.CATEGORIES_EXO = [
  { id: "tous", label: "Tous" },
  { id: "marche", label: "Marche" },
  { id: "chaise", label: "Sur chaise" },
  { id: "mobilite", label: "Mobilité" },
  { id: "renforcement", label: "Renforcement doux" },
  { id: "aquagym", label: "Aquagym" }
];

PAP.PROGRAMMES = [
  {
    id: "premier-souffle",
    nom: "Premier souffle",
    sousTitre: "Débutant · semaines 1 à 4",
    duree: "4 semaines",
    rythme: "3 séances par semaine",
    description: "Pour commencer tout en douceur : mobilité, chaise, et de courtes marches. L'objectif n'est pas la performance, c'est d'installer une habitude agréable.",
    semaines: [
      {
        titre: "Semaines 1 et 2 — s'habituer",
        seances: [
          { nom: "Séance A · Mobilité sur chaise", duree: 14, exercices: ["nuque", "epaules", "bras-assis", "marche-assise", "respiration"] },
          { nom: "Séance B · Petite marche", duree: 15, exercices: ["marche-place", "marche-10", "chevilles"] },
          { nom: "Séance C · Jambes en douceur", duree: 16, exercices: ["epaules", "jambes-assis", "assis-debout", "coussin", "respiration"] }
        ]
      },
      {
        titre: "Semaines 3 et 4 — un peu plus longtemps",
        seances: [
          { nom: "Séance A · Mobilité et mur", duree: 16, exercices: ["nuque", "chat-assis", "gainage-mur", "bras-assis", "respiration"] },
          { nom: "Séance B · Marche 20 min (ou 10+10)", duree: 24, exercices: ["marche-place", "marche-20", "chevilles"] },
          { nom: "Séance C · Chaise et équilibre", duree: 18, exercices: ["marche-assise", "assis-debout", "pompes-mur", "inclinaisons", "respiration"] }
        ]
      }
    ]
  },
  {
    id: "en-route",
    nom: "En route",
    sousTitre: "Après les bases · semaines 5 à 8",
    duree: "4 semaines",
    rythme: "3 à 4 séances par semaine",
    description: "Quand les premières semaines passent bien : on allonge un peu la marche et on ajoute un renforcement toujours prudent. Vous pouvez rester sur « Premier souffle » aussi longtemps que vous voulez.",
    semaines: [
      {
        titre: "Semaines 5 et 6",
        seances: [
          { nom: "Séance A · Marche avec pauses", duree: 22, exercices: ["marche-place", "marche-pauses", "chevilles", "respiration"] },
          { nom: "Séance B · Renforcement doux", duree: 20, exercices: ["epaules", "assis-debout", "pompes-mur", "pont", "respiration"] },
          { nom: "Séance C · Mobilité complète", duree: 16, exercices: ["nuque", "chat-assis", "inclinaisons", "bras-assis", "coussin"] }
        ]
      },
      {
        titre: "Semaines 7 et 8",
        seances: [
          { nom: "Séance A · Marche 20 min + mobilité", duree: 26, exercices: ["marche-20", "inclinaisons", "respiration"] },
          { nom: "Séance B · Force et mur", duree: 20, exercices: ["jambes-assis", "assis-debout", "gainage-mur", "pompes-mur", "pont"] },
          { nom: "Séance C · Option aquagym ou marche", duree: 20, exercices: ["aqua-marche", "aqua-bras"] },
          { nom: "Séance D · Relâchement (jour plus fatigué)", duree: 12, exercices: ["marche-assise", "epaules", "nuque", "respiration"] }
        ]
      }
    ]
  },
  {
    id: "je-continue",
    nom: "Je continue",
    sousTitre: "Consolidation, à votre rythme",
    duree: "À répéter",
    rythme: "3 à 5 séances par semaine",
    description: "Un menu flexible pour durer : marche, renforcement, mobilité, et aquagym si vous aimez l'eau. Choisissez 3 séances dans la semaine, remplacez-en une par du repos dès que le corps le demande.",
    semaines: [
      {
        titre: "Une semaine type, à assembler",
        seances: [
          { nom: "Marche de confort", duree: 22, exercices: ["marche-place", "marche-20", "respiration"] },
          { nom: "Intervalles doux", duree: 20, exercices: ["marche-pauses", "chevilles"] },
          { nom: "Renforcement complet", duree: 22, exercices: ["assis-debout", "pont", "pompes-mur", "gainage-mur", "coussin"] },
          { nom: "Mobilité et souffle", duree: 16, exercices: ["nuque", "epaules", "chat-assis", "inclinaisons", "respiration"] },
          { nom: "Séance aquatique (si piscine)", duree: 25, exercices: ["aqua-marche", "aqua-bras"] }
        ]
      }
    ]
  }
];

PAP.RECETTES = [
  { id: "soupe-legumes", nom: "Soupe de légumes du marché", temps: "35 min", pour: "2 à 3 parts", prix: "Économique", tags: ["chaud", "batch"],
    intro: "Un grand classique, à faire en quantité pour deux jours.",
    ingredients: ["1 oignon", "2 carottes", "2 pommes de terre", "1 poireau ou 2 branches de céleri", "1 courgette ou un reste de légumes", "1 cube de bouillon (ou eau + herbes)", "Huile d'olive, sel, poivre"],
    etapes: ["Faites revenir l'oignon émincé dans un filet d'huile.", "Ajoutez les légumes coupés en morceaux, couvrez d'eau à hauteur, jetez le cube.", "Laissez mijoter 20 à 25 min. Mixez ou laissez en morceaux.", "Rectifiez l'assaisonnement. Un peu de fromage râpé ou de pain complet en accompagnement, si vous aimez."] },
  { id: "lentilles-corail", nom: "Lentilles corail au curry doux", temps: "25 min", pour: "2 parts", prix: "Économique", tags: ["rapide", "protéines"],
    intro: "Un plat unique, rassasiant, avec des ingrédients de placard.",
    ingredients: ["150 g de lentilles corail", "1 oignon", "1 gousse d'ail", "1 tomate ou 1 c. à soupe de concentré", "1 c. à café de curry (ou cumin + paprika)", "400 ml d'eau", "Un filet de lait de coco ou un yaourt nature (option)"],
    etapes: ["Faites suer oignon et ail.", "Ajoutez épices, tomate, lentilles rincées et l'eau.", "Laissez 15 min à feu moyen, jusqu'à ce que ce soit fondant.", "Liez avec un peu de yaourt ou de lait de coco. Servez avec du riz ou du pain."] },
  { id: "omelette-legumes", nom: "Omelette aux légumes", temps: "15 min", pour: "1 à 2 parts", prix: "Économique", tags: ["rapide", "œufs"],
    intro: "Le repas express qui utilise les restes du bac à légumes.",
    ingredients: ["3 œufs", "Un poignée de légumes (courgette, poivron, épinards, reste de poêlée)", "1 c. à soupe de lait ou d'eau", "Huile ou beurre, herbes, sel, poivre"],
    etapes: ["Faites revenir les légumes quelques minutes.", "Battez les œufs avec le lait, versez.", "Cuisez à feu moyen, pliez. Accompagnez d'une salade ou d'une tartine de pain complet."] },
  { id: "salade-pois-chiches", nom: "Salade de pois chiches", temps: "15 min", pour: "2 parts", prix: "Économique", tags: ["froid", "sans cuisson"],
    intro: "Idéale à emporter, à préparer la veille.",
    ingredients: ["1 boîte de pois chiches, rincés", "1 tomate", "1 demi-concombre", "1 oignon doux ou 2 c. à soupe d'herbes", "Jus d'un demi-citron, huile d'olive", "Option : feta, thon, ou restes de poulet"],
    etapes: ["Mélangez tous les ingrédients dans un saladier.", "Assaisonnez, laissez reposer 10 min si vous avez le temps.", "Goûtez, ajustez citron et sel."] },
  { id: "poulet-four", nom: "Poulet et légumes au four", temps: "45 min", pour: "2 à 3 parts", prix: "Modéré", tags: ["four", "batch"],
    intro: "Un seul plat, peu de vaisselle, des restes pour le lendemain.",
    ingredients: ["4 hauts de cuisse ou 2 filets de poulet", "Pommes de terre, carottes, oignons (et courgettes en saison)", "Huile d'olive, thym ou herbes de Provence, ail, sel, poivre"],
    etapes: ["Préchauffez le four à 200 °C.", "Disposez les légumes coupés et le poulet sur une plaque, huilez, herbez.", "Enfournez 35 à 45 min, jusqu'à ce que le poulet soit bien cuit et les légumes tendres.", "Servez avec une verdure crue si vous en avez."] },
  { id: "pates-tomate", nom: "Pâtes sauce tomate maison", temps: "20 min", pour: "2 parts", prix: "Économique", tags: ["rapide"],
    intro: "Simple, réconfortant, et bien meilleur qu'un sachet tout prêt.",
    ingredients: ["200 g de pâtes (complètes si vous aimez)", "1 gousse d'ail", "1 boîte de tomates concassées", "Origan ou basilic, huile d'olive", "Option : légumes en dés, thon, ou un peu de fromage"],
    etapes: ["Faites cuire les pâtes.", "Dans une poêle, dorez l'ail, ajoutez les tomates et les herbes, laissez réduire 10 min.", "Mélangez aux pâtes. Ajoutez ce que vous avez sous la main."] },
  { id: "gratin-courgettes", nom: "Gratin de courgettes", temps: "40 min", pour: "2 à 3 parts", prix: "Économique", tags: ["four"],
    intro: "Un accompagnement qui peut aussi devenir le plat, avec une salade et du pain.",
    ingredients: ["3 courgettes", "1 oignon", "2 œufs", "20 cl de lait", "Fromage râpé (une poignée)", "Muscade, sel, poivre"],
    etapes: ["Faites revenir oignon et courgettes en rondelles.", "Battez œufs, lait, épices. Versez sur les légumes dans un plat.", "Parsemez de fromage, enfournez 25 min à 180 °C."] },
  { id: "boulgour-legumes", nom: "Boulgour aux légumes", temps: "25 min", pour: "2 parts", prix: "Économique", tags: ["végétarien"],
    intro: "Moins cher que le quinoa, très bon chaud ou froid.",
    ingredients: ["120 g de boulgour", "1 oignon", "1 poivron ou 1 courgette", "1 tomate", "Bouillon, citron, menthe ou persil"],
    etapes: ["Faites revenir les légumes, ajoutez le boulgour, puis le bouillon à hauteur.", "Couvrez 10 à 12 min hors feu ou à feu doux.", "Ajoutez le persil et le citron, et c'est prêt."] },
  { id: "poisson-papillote", nom: "Poisson en papillote", temps: "25 min", pour: "2 parts", prix: "Modéré", tags: ["léger", "four"],
    intro: "Cuisson sans odeur forte, texture fondante, peu de matière grasse.",
    ingredients: ["2 filets de poisson blanc (lieu, cabillaud, colin)", "1 citron", "1 courgette ou 1 poireau", "Herbes, un filet d'huile, sel, poivre"],
    etapes: ["Déposez le poisson et les légumes en lamelles sur du papier cuisson.", "Citron, herbes, huile. Fermez bien la papillote.", "20 min au four à 180 °C, ou 8–10 min au micro-ondes selon l'épaisseur."] },
  { id: "ratatouille", nom: "Ratatouille simple", temps: "40 min", pour: "3 à 4 parts", prix: "Économique", tags: ["batch", "été"],
    intro: "Encore meilleure réchauffée. Se congèle bien.",
    ingredients: ["1 oignon", "1 aubergine", "2 courgettes", "1 poivron", "4 tomates ou 1 boîte", "Ail, thym, huile d'olive"],
    etapes: ["Coupez tout en cubes. Faites revenir l'oignon, puis les légumes plus fermes, enfin tomates et herbes.", "Laissez mijoter à couvert 25 min. Servez avec œufs, riz, pâtes ou poulet."] },
  { id: "haricots-tomate", nom: "Haricots rouges à la tomate", temps: "20 min", pour: "2 parts", prix: "Économique", tags: ["protéines", "placard"],
    intro: "Un chili tout doux, sans piment si vous préférez.",
    ingredients: ["1 boîte de haricots rouges", "1 oignon", "1 boîte de tomates", "Cumin, paprika, ail", "Riz pour accompagner"],
    etapes: ["Suez l'oignon et l'ail, épices, tomates, haricots rincés.", "Mijotez 15 min. Servez sur du riz, avec un peu de fromage ou de yaourt."] },
  { id: "potiron", nom: "Velouté de potiron", temps: "30 min", pour: "3 parts", prix: "Économique", tags: ["chaud", "automne"],
    intro: "Doux, réconfortant, et très simple à mixer.",
    ingredients: ["600 g de potiron ou butternut", "1 pomme de terre", "1 oignon", "Bouillon", "Une pincée de muscade, un peu de crème ou lait (option)"],
    etapes: ["Faites revenir l'oignon, ajoutez potiron et pomme de terre en cubes, couvrez de bouillon.", "20 min de cuisson, mixez, muscade, un filet de crème si vous voulez."] },
  { id: "taboule", nom: "Taboulé de légumes", temps: "20 min + repos", pour: "2 à 3 parts", prix: "Économique", tags: ["froid"],
    intro: "Version généreuse en légumes, parfaite à emporter.",
    ingredients: ["150 g de semoule fine", "1 tomate, 1 concombre, un quart d'oignon", "Persil (et menthe si possible)", "Jus de citron, huile d'olive"],
    etapes: ["Versez un volume d'eau bouillante sur la semoule, couvrez 10 min, égrenez.", "Ajoutez les légumes en petits dés, herbes, citron, huile.", "Laissez reposer au frais si vous pouvez."] },
  { id: "oeufs-epinards", nom: "Œufs brouillés aux épinards", temps: "10 min", pour: "1 part", prix: "Économique", tags: ["rapide", "petit-déjeuner"],
    intro: "Un petit-déjeuner ou un dîner en un clin d'œil.",
    ingredients: ["2 œufs", "Une poignée d'épinards (frais ou surgelés)", "Pain complet", "Sel, poivre, un peu de fromage optionnel"],
    etapes: ["Faites tomber les épinards dans la poêle.", "Ajoutez les œufs battus, remuez à feu doux.", "Servez sur le pain toasté."] },
  { id: "fromage-blanc-fruits", nom: "Fromage blanc, fruits et noix", temps: "5 min", pour: "1 part", prix: "Économique", tags: ["rapide", "sans cuisson"],
    intro: "Un encas ou un petit-déjeuner rassasiant, sans paquet industriel.",
    ingredients: ["Un bol de fromage blanc ou yaourt nature", "Un fruit de saison (ou surgelé)", "Une petite poignée de noix, amandes ou graines", "Une cuillère de flocons d'avoine (option)"],
    etapes: ["Déposez le fromage blanc dans un bol.", "Ajoutez le fruit coupé et les oléagineux.", "Un filet de miel si vous aimez, sans que ce soit obligatoire."] },
  { id: "flocons-lait", nom: "Flocons d'avoine tièdes", temps: "8 min", pour: "1 part", prix: "Économique", tags: ["petit-déjeuner"],
    intro: "Chaud en hiver, prêt en quelques minutes.",
    ingredients: ["5 c. à soupe de flocons d'avoine", "Un bol de lait ou boisson végétale", "Une pincée de cannelle", "Fruit, raisins secs ou un peu de beurre de cacahuète"],
    etapes: ["Chauffez flocons et lait 3 à 5 min, en remuant.", "Ajoutez cannelle et garniture. Vous pouvez aussi les laisser gonfler à froid la veille."] },
  { id: "salade-reste-poulet", nom: "Salade composée « il reste du poulet »", temps: "10 min", pour: "1 à 2 parts", prix: "Économique", tags: ["reste", "rapide"],
    intro: "Le réflexe anti-gaspillage du lendemain de rôti.",
    ingredients: ["Reste de poulet effiloché", "Salade ou légumes crus", "1 poignée de légumineuses ou de riz froid", "Vinaigrette simple (moutarde, huile, vinaigre)"],
    etapes: ["Coupez, mélangez, assaisonnez.", "Ajoutez un fruit (pomme, raisin) si vous voulez du croquant."] },
  { id: "thon-crudites", nom: "Tartine complète thon-crudités", temps: "8 min", pour: "1 part", prix: "Économique", tags: ["rapide"],
    intro: "Un déjeuner de bureau sans cantine.",
    ingredients: ["2 tranches de pain complet", "1 petite boîte de thon au naturel", "1 yaourt ou 1 c. à soupe de moutarde", "Tomate, concombre, ou carotte râpée"],
    etapes: ["Mélangez le thon avec un peu de yaourt ou de moutarde.", "Étalez sur le pain, garnissez de crudités."] },
  { id: "pot-au-feu-legumes", nom: "Pot-au-feu de légumes (et un peu de viande si vous voulez)", temps: "50 min", pour: "4 parts", prix: "Économique", tags: ["batch", "hiver"],
    intro: "Un plat mijoté du dimanche, qui nourrit plusieurs repas.",
    ingredients: ["Carottes, poireaux, navets, pommes de terre, chou", "1 oignon piqué d'un clou de girofle si vous en avez", "Bouquet garni", "Option : morceau de bœuf à bouillir, ou pois chiches pour une version sans viande"],
    etapes: ["Couvrez les ingrédients d'eau froide, salez légèrement, portez à petit frémissement.", "Laissez 40 à 50 min (plus si viande).", "Servez le bouillon d'abord ou avec les légumes. Les restes font une soupe le lendemain."] },
  { id: "riz-petits-pois", nom: "Riz, petits pois et omelette", temps: "25 min", pour: "2 parts", prix: "Économique", tags: ["rapide", "placard"],
    intro: "Inspiré des plats « un bol », avec ce qu'il y a dans le congélateur.",
    ingredients: ["150 g de riz", "Une tasse de petits pois surgelés", "2 œufs", "Sauce soja ou un peu de moutarde", "Oignon ou oignon nouveau"],
    etapes: ["Cuisez le riz. Faites sauter l'oignon et les petits pois.", "Préparez une petite omelette, coupez-la en lanières.", "Mélangez le tout, assaisonnez. Un filet de citron réveille le plat."] }
];

PAP.GUIDES_ASSIETTE = [
  {
    id: "assiette",
    titre: "La méthode de l'assiette",
    texte: "Imaginez votre assiette, au déjeuner ou au dîner, en trois zones, sans compter quoi que ce soit : environ la moitié en légumes (crus ou cuits, soupe, salade), un quart en féculents (pain, riz, pâtes, pommes de terre, légumineuses), un quart en protéines (œuf, poisson, viande, tofu, lentilles…). Ajoutez un peu de matière grasse de qualité (huile, oléagineux) et, si vous en avez envie, un laitage ou un fruit. Ce n'est pas une règle militaire : c'est un repère visuel, à adapter à votre faim et à vos goûts."
  },
  {
    id: "portions",
    titre: "Les portions, sans obsession",
    texte: "Une portion, c'est d'abord ce qui vous rassasie confortablement, sans avoir à vous « remplir » ni à vous restreindre jusqu'à la frustration. Des repères simples existent : une paume pour une portion de viande ou de poisson, un poing pour les féculents, deux poignées pour les légumes. Ils sont indicatifs. Mieux vaut un repas copieux écouté, qu'un repas trop petit suivi d'un grignotage punitif. Vous avez le droit de vous resservir de légumes, et le droit de laisser quelque chose dans l'assiette."
  },
  {
    id: "eau",
    titre: "S'hydrater, simplement",
    texte: "L'eau est la boisson de tous les jours. Un verre en se levant, un verre à chaque repas, une bouteille à portée de main : cela suffit souvent à mieux boire, sans viser un chiffre magique. Le thé, la tisane, l'eau aromatisée maison (citron, menthe) comptent. Les sodas et jus, même « light », sont à garder pour le plaisir occasionnel plutôt que comme boisson de fond. La soif se déguise parfois en envie de grignoter : un verre d'eau, on attend deux minutes, on réévalue."
  },
  {
    id: "faim",
    titre: "Faim ou envie ?",
    texte: "La faim arrive progressivement, dans le ventre, et un vrai repas la calme. L'envie (ou la « fringale émotionnelle ») arrive souvent soudainement, pour un aliment précis, parfois après une émotion, un ennui, une fatigue. Ni l'une ni l'autre n'est une faute. Une petite pause aide : boire, respirer, se demander « de quoi ai-je vraiment besoin ? ». Parfois c'est un repas. Parfois c'est du repos, ou de la compagnie. Si vous mangez par envie, autant le faire posément, sans vous punir ensuite. La restriction trop sévère nourrit souvent les envies."
  },
  {
    id: "pas-de-regime",
    titre: "Pas de régime extrême",
    texte: "Les régimes très restrictifs font souvent maigrir vite… puis reprendre, parfois avec un extra, et beaucoup de culpabilité. Ici, on ne compte pas les calories, on ne bannit aucun aliment, on ne promet pas de transformation spectaculaire. L'idée, c'est d'ajouter (des légumes, de l'eau, des repas réguliers, du plaisir) plutôt que d'interdire. Si un professionnel de santé vous propose un plan, c'est avec vous, et à votre mesure. Méfiez-vous des miracles et des interdits radicaux."
  }
];

PAP.CONSEILS_JOUR_DIFFICILE = [
  { titre: "Une rechute, c'est normal", texte: "Un écart, un week-end copieux, une semaine sans bouger : cela fait partie du chemin, pas de sa négation. Vous n'avez rien « gâché ». La suite commence au prochain repas, à la prochaine marche, sans rattrapage punitif." },
  { titre: "Baissez la barre, ne l'abandonnez pas", texte: "Les jours lourds, visez le minimum gentil : un verre d'eau, cinq minutes de marche sur place, un vrai repas simple. Continuer tout petit, c'est encore continuer." },
  { titre: "Pas de compensation", texte: "Sauter un repas pour « rattraper », se priver le lendemain, s'imposer un exercice punitif : cela entretient le cercle. Mangez normalement, bougez si cela vous fait du bien, et tournez la page." },
  { titre: "Nommez ce que vous ressentez", texte: "Fatigue, tristesse, colère, solitude, ennui… Mettre un mot (dans le journal de l'appli, ou sur un papier) désamorce un peu la honte. L'émotion n'est pas une preuve que « vous n'y arriverez pas »." },
  { titre: "Sortez trois minutes", texte: "Balcon, palier, trottoir, fenêtre ouverte. L'air et la lumière changent parfois le volume des pensées. Ce n'est pas une séance de sport, c'est une respiration." },
  { titre: "Parlez à quelqu'un", texte: "Un proche, un soignant, une association. Vous n'avez pas à porter cela seul. Demander de l'aide est un geste de soin, pas un aveu d'échec." },
  { titre: "Le corps n'est pas un ennemi", texte: "Même aujourd'hui, il respire, digère, vous porte. Un « merci » intérieur, ou simplement arrêter de le commenter sévèrement, est déjà une victoire discrète." },
  { titre: "Revenez sans drame", texte: "Le plus puissant n'est pas de ne jamais tomber. C'est de revenir, simplement, comme on rentre chez soi, sans se faire un procès." }
];

PAP.HUMEURS = [
  { id: "au-top", label: "Au top", emoji: "☀️" },
  { id: "plutot-bien", label: "Plutôt bien", emoji: "🌿" },
  { id: "comme-ci", label: "Comme ci, comme ça", emoji: "🌤" },
  { id: "difficile", label: "Journée difficile", emoji: "🌧" },
  { id: "douceur", label: "Besoin de douceur", emoji: "💛" }
];

PAP.FOOD_MOODS = [
  { id: "serenite", label: "J'ai mangé posément, à l'écoute" },
  { id: "faim", label: "J'ai bien reconnu ma faim et ma satiété" },
  { id: "plaisir", label: "J'ai pris du plaisir, sans me juger" },
  { id: "irregulier", label: "Repas irréguliers, c'est un peu brouillon" },
  { id: "envie", label: "Beaucoup d'envies, pas toujours de faim" },
  { id: "dur", label: "Rapport un peu tendu à l'alimentation aujourd'hui" }
];

PAP.BADGES = [
  { id: "bienvenue", nom: "Bienvenue", ico: "🌱", hint: "Avoir commencé, tout simplement" },
  { id: "premier-objectif", nom: "Premier geste", ico: "✨", hint: "Cocher un objectif du jour" },
  { id: "elan-3", nom: "3 jours d'élan", ico: "🔥", hint: "3 jours d'affilée" },
  { id: "elan-7", nom: "Une belle semaine", ico: "🌟", hint: "7 jours d'affilée" },
  { id: "elan-14", nom: "Deux belles semaines", ico: "🏅", hint: "14 jours d'affilée" },
  { id: "elan-30", nom: "Un mois d'élan", ico: "🏆", hint: "30 jours d'affilée" },
  { id: "premier-poids", nom: "Premier point", ico: "⚖️", hint: "Noter une pesée" },
  { id: "kilo-1", nom: "Un kilo en chemin", ico: "🎈", hint: "1 kg de moins qu'au départ" },
  { id: "kilo-3", nom: "Trois kilos", ico: "🪁", hint: "3 kg de moins qu'au départ" },
  { id: "kilo-5", nom: "Cinq kilos", ico: "🎯", hint: "5 kg de moins qu'au départ" },
  { id: "palier-5", nom: "Palier 5 %", ico: "🌿", hint: "5 % du poids de départ" },
  { id: "palier-10", nom: "Palier 10 %", ico: "🌳", hint: "10 % du poids de départ" },
  { id: "premiere-seance", nom: "Première séance", ico: "🚶", hint: "Terminer un exercice ou un programme" },
  { id: "seances-5", nom: "Cinq séances", ico: "💪", hint: "5 séances bouclées" },
  { id: "seances-10", nom: "Dix séances", ico: "🌈", hint: "10 séances bouclées" },
  { id: "eau-7", nom: "Semaine hydratée", ico: "💧", hint: "Eau cochée 7 jours (pas forcément d'affilée)" },
  { id: "journal-3", nom: "Je note mon humeur", ico: "📓", hint: "3 entrées au journal" },
  { id: "souffle", nom: "Souffle posé", ico: "🌬️", hint: "Terminer un exercice de cohérence cardiaque" },
  { id: "cuisine", nom: "À table, simplement", ico: "🍲", hint: "Enregistrer un bilan alimentaire" },
  { id: "constance", nom: "Je reviens", ico: "🤍", hint: "10 jours avec au moins un geste" }
];

PAP.RESSOURCES = [
  { nom: "Manger Bouger (Programme national nutrition santé)", url: "https://www.mangerbouger.fr/", pourquoi: "Repères officiels pour manger et bouger, sans régime miracle." },
  { nom: "ameli.fr — Surpoids ou obésité de l'adulte", url: "https://www.ameli.fr/assure/sante/themes/surpoids-obesite-adulte/preparer-agir", pourquoi: "Informations de l'Assurance Maladie pour préparer un accompagnement avec son médecin." },
  { nom: "HAS — Guide du parcours de soins (surpoids et obésité de l'adulte)", url: "https://www.has-sante.fr/jcms/p_3408871/fr/guide-du-parcours-de-soins-surpoids-et-obesite-de-l-adulte", pourquoi: "Guide officiel de la Haute Autorité de santé à destination des professionnels, utile à connaître." },
  { nom: "Ligue nationale contre l'obésité", url: "https://liguecontrelobesite.org/", pourquoi: "Association d'intérêt général, réseau d'entraide et d'information pour les personnes concernées." }
];
