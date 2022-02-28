# Clean Code OCR

## Énoncé

### User Story 1

Le format créé par la machine est le suivant :

```
    _  _     _  _  _  _  _ 
  | _| _||_||_ |_   ||_||_|
  ||_  _|  | _||_|  ||_| _|
  
```

Chaque entrée fait exactement **4 lignes et 27 colonnes** (9 x 3).
Les trois premières lignes décrivent des chiffres grâce à des pipes et des underscores.
La quatrième ligne est blanche.

Chaque entrée ou **code** créé possède 9 chiffres, chacun allant de 0 à 9.
Un fichier classique peut contenir jusqu'à 100 entrées.

Ecrivez un programme qui prend en entrée ce fichier et arrive à parser les codes contenus.

### User Story 2

Parfois, la machine génère de mauvais codes.
Vous devez maintenant pouvoir valider les codes grâce à un checksum.
Il peut être calculé de la manière suivante :

code     : 3 5 6 6 0 9 7 0 1
position : p9 p8 p7 p6 p5 p4 p3 p2 p1

calcul du checksum :  
((1*p1) + (2*p2) + (3*p3) + ... + (9*p9)) mod 11 == 0

### User Story 3

Votre manager souhaite obtenir les résultats de votre programme.
Il vous demande d'écrire un fichier en sortie, pour chacun des fichiers en entrée, sur ce format:

457508000  
664371495 ERR

Le fichier en sortie possède un code par ligne.
Si le checksum est mauvais, c'est indiqué par ERR dans une seconde colonne indiquant le statut.

### User Story 4

Parfois, la machine produit des nombres illisibles, comme le suivant :

```
    _  _     _  _  _  _  _ 
  | _|  |  | _||_   ||_|| |
  ||_  _|  | _||_|  ||_| _|
  
```

Votre programme doit être capable de repérer de tels problèmes.
Dans ce cas, les nombres inconnus sont remplacés par des '?'.
Mettez à jour votre sortie fichier. Avec le nombre illisible précédent, cela donnerait :

457508000    
664371495 ERR   
12?13678? ILL

### User Story 5

Votre manager aimerait faire un peu de classification.
Pour un ensemble de fichiers donnés en entrée, il voudrait maintenant avoir la possibilité de :

- soit garder le comportement actuel et créer un fichier sortie pour chaque fichier entrée
- soit utiliser un nouveau comportement qui lui permette de "regrouper" les codes similaires

Ce comportement est le suivant : Quel que soit le nombre de fichiers en entrée, le programme va créer 3 sorties nommées
authorized, errored, et unknown

Authorized contient tous les checksums valides  
Errored contient tous les checksums invalides  
Unknown contient tous les checksums illisibles

### User Story 6

Fournissez un outil de commande aux autres développeurs de votre société pour qu'ils puissent facilement utiliser toutes
les fonctionnalités que vous venez de créer.

Son implémentation est libre.

## Implémentation

### CLI et lancement

You can run few commands to start/build this app :

- `npm run start` : Run compiled app in **dist** folder.
- `npm run build` : Compile the app and generate **dist** folder
- `npm run build-dev` :  Compile the app and generate **dist** folder then run it ( build + start )
- `npm run dev` : Directly run the TS source project
- `npm run test` : Run cucumber tests. This generates two report :
    - One in coverage folder which show the test coverage
    - One in **cucumber_report.html** at the root of the project that show how cucumber tests results
- `npm run lint` : Run `Eslint` on source code

### Classes

The two main classes

### Tests & Coverage

When we run the cucumber tests, it generates two reports

#### Coverage Report

The first one is a code coverage on cucumber's tests. This file is viewable on **coverage/index.html** and look like
this :

![image-20220208192354230](doc/README/image-20220208192354230.png)

![image-20220208192400658](doc/README/image-20220208192400658.png)

#### Cucumber report

The other report is the result of the ran cucumber's tests :

![image-20220208192621443](doc/README/image-20220208192621443.png)

![image-20220208192633476](doc/README/image-20220208192633476.png)

