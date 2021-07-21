# SEL Raismes

## Version 1

Dans la version 1 l'ADMIN aura la responsabilité de création des sélistes à partir des inscriptions sur papier, mais aussi les publications (offre) qui lui parivendraient soit par mail soit à l'écrit en permanence, depuis l'interface ADMIN dédié tout en accord avec les entités définies.

Un séliste pourrait accéder aux annonces depuis le site web, entrer directement en contact par mail ou téléphone. Une fois l'échange terminé, le séliste entre en contact avec l'ADMIN afin que ce dernier supprime l'annonce (ou modifie), mais aussi mette à jour le solde des 2 sélistes.

Dans la première version, l'ADMIN a une place centrale dans la gestion du SEL.

Dans les prochaines versions de l'application il sera possible, pour un séliste, de 

* s'inscrire directement via le site internet
* créer une annonce (offre), modifier et supprimer

Il est aussi prévu une séction pour des annonces de demande de services.

## Entités représentant l'utilisateur et les annonces

User (séliste)
* id (identifiant unique)
* nom
* prenom
* adresse
* mail
* number (numéro portable)
* inscription (date d'inscription)
* gender (m,f,_)

Publication
* categ (catégorie)
* user (séliste proposant le service)
* List(slot) (créneaux horaires)
* date (date de création de l'annonce) as String
* cost (coût du service)
* adresse (demande de service ???)

ATTENTION: l'objet utilisateur est stoqué dans l'objet publication pour réduire les léctures. En cas de mise à jour il faut modifier toutes les publications contenant l'objet

## Deploy with Firebase Hosting
```
./deploy
```

## Mail

SendGrid is used for mailing. Basic account offers 100 mails per day

## Map

Mairie annexe buliding's coordinates are  { 50.403587663227206, 3.5099710163715776 }