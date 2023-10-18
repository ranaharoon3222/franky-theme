<script setup>
import { ref, computed } from 'vue';
import { defineProps } from 'vue';
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from '@headlessui/vue';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid';

const breeds = [
    {
        label: 'Affenpinscher',
        value: '1'
    },
    {
        label: 'Afghan Hound',
        value: '1'
    },
    {
        label: 'Aidi',
        value: '1'
    },
    {
        label: 'Airedale Terrier',
        value: '82'
    },
    {
        label: 'Akita',
        value: '1'
    },
    {
        label: 'Alaskan Malamute',
        value: '1'
    },
    {
        label: 'Alpine Dachsbracke',
        value: '1'
    },
    {
        label: 'American Akita',
        value: '1'
    },
    {
        label: 'American Foxhound',
        value: '1'
    },
    {
        label: 'American Staffordshire Terrier',
        value: '1'
    },
    {
        label: 'American Cocker Spaniel',
        value: '1'
    },
    {
        label: 'American Water Spaniel',
        value: '1'
    },
    {
        label: 'Anglo-Français de Petite Vénerie',
        value: '1'
    },
    {
        label: 'Appenzeller Mountain Dog',
        value: '1'
    },
    {
        label: 'Argentine Dog',
        value: '1'
    },
    {
        label: 'Ariégois',
        value: '1'
    },
    {
        label: 'Australian Cattle Dog',
        value: '1'
    },
    {
        label: 'Australian Kelpie',
        value: '1'
    },
    {
        label: 'Australian Shepherd',
        value: '1'
    },
    {
        label: 'Australian Silky Terrier',
        value: '1'
    },
    {
        label: 'Australian Stumpy Tail Cattle Dog',
        value: '1'
    },
    {
        label: 'Australian Terrier',
        value: '1'
    },
    {
        label: 'Azawakh',
        value: '1'
    },

    {
        label: 'Barbet',
        value: '1'
    },
    {
        label: 'Borsoi',
        value: '1'
    },
    {
        label: 'Basenji',
        value: '1'
    },
    {
        label: 'Basset Artesien Normand',
        value: '1'
    },
    {
        label: 'Basset Bleu de Gascogne',
        value: '1'
    },
    {
        label: 'Basset Fauve de Bretagne',
        value: '1'
    },
    {
        label: 'Basset Hound',
        value: '1'
    },
    {
        label: 'Bayerischer Gebirgsschweisshund',
        value: '1'
    },
    {
        label: 'Beagle',
        value: '1'
    },
    {
        label: 'Beagle Harrier',
        value: '1'
    },
    {
        label: 'Bearded Collie',
        value: '113'
    },
    {
        label: 'Beauceron',
        value: '1'
    },
    {
        label: 'Bedlington Terrier',
        value: '1'
    },
    {
        label: 'Belgian Shepherd Dog, Groenendael',
        value: '1'
    },
    {
        label: 'Belgian Shepherd Dog, Laekenois',
        value: '1'
    },
    {
        label: 'Belgian Shepherd Dog, Malinois',
        value: '1'
    },
    {
        label: 'Belgian Shepherd Dog, Tervuerense',
        value: '1'
    },
    {
        label: 'Bergamasco',
        value: '1'
    },
    {
        label: 'Maremma Mountain Dog',
        value: '1'
    },
    {
        label: 'Bernese Laufhund',
        value: '1'
    },
    {
        label: 'Bernese Niederlaufhund',
        value: '1'
    },
    {
        label: 'Bernese Mountain Dog',
        value: '1'
    },
    {
        label: 'Bichon Frisé',
        value: '82'
    },
    {
        label: 'Billy',
        value: '1'
    },
    {
        label: 'Black and Tan Coonhound',
        value: '1'
    },
    {
        label: 'Bloodhound',
        value: '1'
    },
    {
        label: 'Bolognese',
        value: '1'
    },
    {
        label: 'Dogue de Bordeaux',
        value: '1'
    },
    {
        label: 'Border Collie',
        value: '1'
    },
    {
        label: 'Border Terrier',
        value: '1'
    },
    {
        label: 'Bosanski Ostrodlaki Gonic Barak',
        value: '1'
    },
    {
        label: 'Boston Terrier',
        value: '1'
    },
    {
        label: 'Bouvier des Ardennes',
        value: '1'
    },
    {
        label: 'Bouvier des Flandres',
        value: '1'
    },
    {
        label: 'Boxer',
        value: '1'
    },
    {
        label: 'Bracco Italiano',
        value: '1'
    },
    {
        label: 'Brandlbracke',
        value: '1'
    },
    {
        label: 'Braque d\'Auvergne',
        value: '1'
    },
    {
        label: 'Braque de l\'Ariege',
        value: '1'
    },
    {
        label: 'Braque du Bourbonnais',
        value: '1'
    },
    {
        label: 'Braque Français, type Gascogne',
        value: '1'
    },
    {
        label: 'Braque Français, type Pyrénées (small)',
        value: '1'
    },
    {
        label: 'Braque Saint Germain',
        value: '1'
    },
    {
        label: 'Brazilian Terrier',
        value: '1'
    },
    {
        label: 'Briard',
        value: '1'
    },
    {
        label: 'Briquet Griffon Vendéen',
        value: '1'
    },
    {
        label: 'Broholmer',
        value: '1'
    },
    {
        label: 'Bull Terrier',
        value: '1'
    },
    {
        label: 'Bullmastiff',
        value: '1'
    },

    {
        label: 'Cairn Terrier',
        value: '1'
    },
    {
        label: 'Canaan Dog',
        value: '1'
    },
    {
        label: 'Cane Corso',
        value: '1'
    },
    {
        label: 'Cão da Serra da Estrela (shorthair)',
        value: '1'
    },
    {
        label: 'Cão da Serra da Estrela (long hair)',
        value: '1'
    },
    {
        label: 'Cao da Serra de Aires',
        value: '1'
    },
    {
        label: 'Cão de Agua Português',
        value: '1'
    },
    {
        label: 'Cão de Castro Laboreiro',
        value: '1'
    },
    {
        label: 'Cão de Gado Transmontano',
        value: '1'
    },
    {
        label: 'Cão Fila de São Miguel',
        value: '1'
    },
    {
        label: 'Cavalier King Charles Spaniel',
        value: '1'
    },
    {
        label: 'Central Asian Ovcharka',
        value: '1'
    },
    {
        label: 'Cesky Fousek',
        value: '1'
    },
    {
        label: 'Cesky Terrier',
        value: '1'
    },
    {
        label: 'Chart Polski',
        value: '1'
    },
    {
        label: 'Chesapeake Bay Retriever',
        value: '1'
    },
    {
        label: 'Chien d\'Artois',
        value: '1'
    },
    {
        label: 'Chinese Crested Dog',
        value: '1'
    },
    {
        label: 'Chodsky Pes',
        value: '1'
    },
    {
        label: 'Chow Chow',
        value: '1'
    },
    {
        label: 'Cimarron Uruguayo',
        value: '1'
    },
    {
        label: 'Ciobanesc Romanesc Carpatin',
        value: '1'
    },
    {
        label: 'Ciobanesc Romanesc de Bucovina',
        value: '1'
    },
    {
        label: 'Ciobanesc Romanesc Mioritic',
        value: '1'
    },
    {
        label: 'Cirneco dell\'Etna',
        value: '1'
    },
    {
        label: 'Clumber Spaniel',
        value: '1'
    },
    {
        label: 'Continental Bulldog',
        value: '1'
    },
    {
        label: 'Coton de Tulear',
        value: '1'
    },
    { 
        label: 'Collies', 
        value: '82' 
    },
    {
        label: 'Crnogorski Planinski Gonic',
        value: '1'
    },
    {
        label: 'Curly Coated Retriever',
        value: '1'
    },

    {
        label: 'Dalmatian',
        value: '113'
    },
    {
        label: 'Dandie Dinmont Terrier',
        value: '1'
    },
    {
        label: 'Daschund',
        value: '82'
    },
    {
        label: 'Danish-Swedish Farm Dog',
        value: '1'
    },
    {
        label: 'Deerhound',
        value: '1'
    },
    {
        label: 'Doberman',
        value: '1'
    },
    {
        label: 'Drever',
        value: '1'
    },
    {
        label: 'German Beagle',
        value: '1'
    },
    {
        label: 'German Boxer',
        value: '113'
    },
    {
        label: 'Great Dane',
        value: '200'
    },
    {
        label: 'German Miniature Pinscher',
        value: '1'
    },
    {
        label: 'German Shepherd Dog',
        value: '1'
    },
    {
        label: 'German Hunting Terrier',
        value: '1'
    },
    {
        label: 'German Pinscher',
        value: '1'
    },
    {
        label: 'German Wirehaired Pointer',
        value: '1'
    },
    {
        label: 'German Shorthaired Pointer',
        value: '1'
    },
    {
        label: 'German Guard Dog',
        value: '1'
    },
    {
        label: 'Dunker',
        value: '1'
    },
    {
        label: 'Miniature Dachshund (shorthair)',
        value: '1'
    },
    {
        label: 'Miniature Badger (long hair)',
        value: '1'
    },
    {
        label: 'Pomeranian',
        value: '1'
    },
    {
        label: 'Miniature Poodle',
        value: '1'
    },
    {
        label: 'Miniature Schnauzer',
        value: '1'
    },
    {
        label: 'Eesti Hagijas',
        value: '1'
    },
    {
        label: 'English Bulldog',
        value: '1'
    },
    {
        label: 'English Cocker Spaniel',
        value: '1'
    },
    {
        label: 'English Setter',
        value: '1'
    },
    {
        label: 'English Springer Spaniel',
        value: '1'
    },
    {
        label: 'English Toy Terrier',
        value: '1'
    },
    {
        label: 'English Foxhound',
        value: '113'
    },
    {
        label: 'Entlebucher Mountain Dog',
        value: '1'
    },
    {
        label: 'Epagneul Bleu de Picardie',
        value: '1'
    },
    {
        label: 'Epagneul Breton',
        value: '1'
    },
    {
        label: 'Epagneul de Pont-Audemer',
        value: '1'
    },
    {
        label: 'Epagneul Français',
        value: '1'
    },
    {
        label: 'Epagneul Nain Continental (Papillon)',
        value: '1'
    },
    {
        label: 'Epagneul Nain Continental (Phalène)',
        value: '1'
    },
    {
        label: 'Epagneul Picard',
        value: '1'
    },
    {
        label: 'Erdelyi Kopo',
        value: '1'
    },
    {
        label: 'Eurasier',
        value: '1'
    },

    {
        label: 'Field Spaniel',
        value: '1'
    },
    {
        label: 'Fila Brasileiro',
        value: '1'
    },
    {
        label: 'Finnish Beagle',
        value: '1'
    },
    {
        label: 'Finnish Lapphund',
        value: '1'
    },
    {
        label: 'Finnish Spitz',
        value: '1'
    },
    {
        label: 'Flat-coated Retriever',
        value: '113'
    },
    {
        label: 'Wirehaired Fox Terrier',
        value: '1'
    },
    {
        label: 'Fox Terrier Smooth Hair',
        value: '1'
    },
    {
        label: 'French Blanc et Noir',
        value: '1'
    },
    {
        label: 'French Blanc et Orange',
        value: '1'
    },
    {
        label: 'Français Tricolore',
        value: '1'
    },
    {
        label: 'French Bulldog',
        value: '1'
    },

    {
        label: 'Galgo Español',
        value: '1'
    },
    {
        label: 'Gammel Dansk Hønsehund',
        value: '1'
    },
    {
        label: 'Golden Retriever',
        value: '82'
    },
    {
        label: 'Gonczy Polski',
        value: '1'
    },
    {
        label: 'Gordon Setter',
        value: '1'
    },
    {
        label: 'Gos d\'Atura Català',
        value: '1'
    },
    {
        label: 'Grand Anglo-Français Blanc et Noir',
        value: '1'
    },
    {
        label: 'Grand Anglo-Français Blanc et Orange',
        value: '1'
    },
    {
        label: 'Grand Anglo-Français Tricolore',
        value: '1'
    },
    {
        label: 'Grand Basset Griffon Vendéen',
        value: '1'
    },
    {
        label: 'Grand Bleu de Gascogne',
        value: '1'
    },
    {
        label: 'Grand Gascon Saintongeois',
        value: '1'
    },
    {
        label: 'Grand Griffon Vendéen',
        value: '1'
    },
    { 
        label: 'Great Dane', 
        value: '200' },
    {
        label: 'Greyhound',
        value: '1'
    },
    {
        label: 'Griffon Belge',
        value: '1'
    },
    {
        label: 'Griffon',
        value: '1'
    },
    {
        label: 'Greenland Dog',
        value: '1'
    },
    {
        label: 'Large Münsterlander',
        value: '1'
    },
    {
        label: 'Large Poodle',
        value: '1'
    },
    {
        label: 'Greater Swiss Mountain Dog',
        value: '1'
    },

    {
        label: 'Haldenstøvare',
        value: '1'
    },
    {
        label: 'Hamiltonstövare',
        value: '1'
    },
    {
        label: 'Hannover\'s Schweisshund',
        value: '1'
    },
    {
        label: 'Harrier',
        value: '1'
    },
    {
        label: 'Havanese',
        value: '1'
    },
    {
        label: 'Heidewachtel',
        value: '1'
    },
    {
        label: 'Hellinikos Ichnilatis',
        value: '1'
    },
    {
        label: 'Hokkaido',
        value: '1'
    },
    {
        label: 'Dutch Shepherd Dog',
        value: '1'
    },
    {
        label: 'Dutch Smoushond',
        value: '1'
    },
    {
        label: 'Hovawart',
        value: '1'
    },
    {
        label: 'Hrvatsky Ovcar',
        value: '1'
    },
    {
        label: 'Hygenhund',
        value: '1'
    },

    {
        label: 'Haldenstøvare',
        value: '1'
    },
    {
        label: 'Hamiltonstövare',
        value: '1'
    },
    {
        label: 'Hannover\'s Schweisshund',
        value: '1'
    },
    {
        label: 'Harrier',
        value: '1'
    },
    {
        label: 'Havanese',
        value: '1'
    },
    {
        label: 'Heidewachtel',
        value: '1'
    },
    {
        label: 'Hellinikos Ichnilatis',
        value: '1'
    },
    {
        label: 'Hokkaido',
        value: '1'
    },
    {
        label: 'Dutch Shepherd Dog',
        value: '1'
    },
    {
        label: 'Dutch Smoushond',
        value: '1'
    },
    {
        label: 'Hovawart',
        value: '1'
    },
    {
        label: 'Hrvatsky Ovcar',
        value: '1'
    },
    {
        label: 'Hygenhund',
        value: '1'
    },

    {
        label: 'Jack Russell Terrier',
        value: '113'
    },
    {
        label: 'Jamthund',
        value: '1'
    },
    {
        label: 'Japanese Spaniel',
        value: '1'
    },
    {
        label: 'Japanese Spitz',
        value: '1'
    },
    {
        label: 'Japanese Terrier',
        value: '1'
    },
    {
        label: 'Jura Laufhund',
        value: '1'
    },
    {
        label: 'Jura Niederlaufhund',
        value: '1'
    },
    {
        label: 'Kai',
        value: '1'
    },
    {
        label: 'Kangal Kopek',
        value: '1'
    },
    {
        label: 'Kaninchen Dachshund',
        value: '1'
    },
    {
        label: 'Karelian Bear Dog',
        value: '1'
    },
    {
        label: 'Caucasian Ovcharka',
        value: '1'
    },
    {
        label: 'Kerry Blue Terrier',
        value: '1'
    },
    {
        label: 'King Charles Spaniel',
        value: '1'
    },
    {
        label: 'Kintamani Bali Dog',
        value: '1'
    },
    {
        label: 'Kishu',
        value: '1'
    },
    {
        label: 'Komondor',
        value: '1'
    },
    {
        label: 'Korea Jindo Dog',
        value: '1'
    },
    {
        label: 'Kraski Ovcar',
        value: '1'
    },
    {
        label: 'Kromfohrlander',
        value: '1'
    },
    {
        label: 'Kuvasz',
        value: '1'
    },

    {
        label: 'Labrador Retriever',
        value: '1'
    },
    {
        label: 'Lagotto Romagnolo',
        value: '1'
    },
    {
        label: 'Lakeland Terrier',
        value: '1'
    },
    {
        label: 'Lancashire Heeler',
        value: '1'
    },
    {
        label: 'Lapinporokoira',
        value: '1'
    },
    {
        label: 'Lion dog',
        value: '1'
    },
    {
        label: 'Leonberger',
        value: '1'
    },
    {
        label: 'Lhasa Apso',
        value: '1'
    },
    {
        label: 'Lucerne Laufhund',
        value: '1'
    },
    {
        label: 'Luzerner Niederlaufhund',
        value: '1'
    },
    {
        label: 'Magyar Agar',
        value: '1'
    },
    { 
        label: 'Magyar Viszla', 
        value: '113' 
    },
    {
        label: 'Maltese',
        value: '1'
    },
    {
        label: 'Manchester Terrier',
        value: '1'
    },
    {
        label: 'Mastiff',
        value: '1'
    },
    {
        label: 'Mastin del Pirineo',
        value: '1'
    },
    {
        label: 'Mastin Español',
        value: '1'
    },
    {
        label: 'Mastino Napoletano',
        value: '1'
    },
    {
        label: 'Mexican Hairless Dog',
        value: '1'
    },
    {
        label: 'Miniature American Shepherd',
        value: '1'
    },
    {
        label: 'Miniature Bull Terrier',
        value: '1'
    },
    {
        label: 'Pug',
        value: '1'
    },
    {
        label: 'Mudi',
        value: '1'
    },

    {
        label: 'Dutch Kooikerhondje',
        value: '1'
    },
    {
        label: 'Dutch Schapendoes',
        value: '1'
    },
    {
        label: 'Newfoundland',
        value: '105'
    },
    {
        label: 'Norwegian Buhund',
        value: '1'
    },
    {
        label: 'Norwegian Elkhound Gray',
        value: '1'
    },
    {
        label: 'Norwegian Elkhound Black',
        value: '1'
    },
    {
        label: 'Norwegian Lundehund',
        value: '1'
    },
    {
        label: 'Norfolk Terrier',
        value: '1'
    },
    {
        label: 'Norrbottenspets',
        value: '1'
    },
    {
        label: 'Norwich Terrier',
        value: '1'
    },
    {
        label: 'Nova Scotia Duck Tolling Retriever',
        value: '1'
    },
    {
        label: 'Ogar Polski',
        value: '1'
    },
    {
        label: 'Old English Sheepdog',
        value: '1'
    },
    {
        label: 'Austrian Pinscher',
        value: '1'
    },
    {
        label: 'East Siberian Laika',
        value: '1'
    },
    {
        label: 'Otterhound',
        value: '1'
    },

    {
        label: 'Parson Russell Terrier',
        value: '1'
    },
    {
        label: 'Pekingese',
        value: '1'
    },
    {
        label: 'Perdigueiro de Burgos',
        value: '1'
    },
    {
        label: 'Perdigueiro Português',
        value: '1'
    },
    {
        label: 'Perro de Agua Español',
        value: '1'
    },
    {
        label: 'Perro de Pastor Mallorquin',
        value: '1'
    },
    {
        label: 'Perro Dogo Mallorquin',
        value: '1'
    },
    {
        label: 'Peruvian Hairless Dog',
        value: '1'
    },
    {
        label: 'Petit Basset Griffon Vendéen',
        value: '1'
    },
    {
        label: 'Petit Bleu de Gascogne',
        value: '1'
    },
    {
        label: 'Petit Brabançon',
        value: '1'
    },
    {
        label: 'Petit Gascon Saintongeois',
        value: '1'
    },
    {
        label: 'Pharaoh Hound',
        value: '1'
    },
    {
        label: 'Picardy Shepherd Dog',
        value: '1'
    },
    {
        label: 'Podenco Canario',
        value: '1'
    },
    {
        label: 'Podenco Ibicenco',
        value: '1'
    },
    {
        label: 'Podengo Português',
        value: '1'
    },
    {
        label: 'Poodle pointer',
        value: '1'
    },
    {
        label: 'Pointer',
        value: '1'
    },
    {
        label: 'Poitevin',
        value: '1'
    },
    {
        label: 'Polski Owczarek Nizinny',
        value: '1'
    },
    {
        label: 'Porcelaine',
        value: '1'
    },
    {
        label: 'Posavski Gonic',
        value: '1'
    },
    {
        label: 'Prazsky Krysarik',
        value: '1'
    },
    {
        label: 'Presa Canario',
        value: '1'
    },
    {
        label: 'Puli',
        value: '1'
    },
    {
        label: 'Pumi',
        value: '1'
    },
    {
        label: 'Pyrenean mountain dog',
        value: '1'
    },
    {
        label: 'Pyrenean Shepherd Dog à face breed',
        value: '1'
    },
    {
        label: 'Pyrenean Shepherd Dog à poil long',
        value: '1'
    },
    {
        label: 'Rafeiro do Alentejo',
        value: '1'
    },
    {
        label: 'Rastreador Brasileiro',
        value: '1'
    },
    {
        label: 'Rhodesian Ridgeback',
        value: '113'
    },
    {
        label: 'Giant Schnauzer',
        value: '1'
    },
    {
        label: 'Rottweiler',
        value: '1'
    },
    {
        label: 'Russian Toy',
        value: '1'
    },
    {
        label: 'Russian-European Laika',
        value: '1'
    },


    {
        label: 'Saarloos wolf dog',
        value: '1'
    },
    {
        label: 'Sabueso Español',
        value: '1'
    },
    {
        label: 'Saluki',
        value: '1'
    },
    {
        label: 'Samoyed',
        value: '1'
    },
    {
        label: 'Sarplaninac',
        value: '1'
    },
    {
        label: 'Schillerstövare',
        value: '1'
    },
    {
        label: 'Schipperke',
        value: '1'
    },
    {
        label: 'Scottish Shorthair Shepherd Dog',
        value: '1'
    },
    {
        label: 'Scottish Shepherd Dog Longhair',
        value: '1'
    },
    {
        label: 'Scottish Terrier',
        value: '1'
    },
    {
        label: 'Schwyzer Laufhund',
        value: '1'
    },
    {
        label: 'Schwyzer Niederlaufhund',
        value: '1'
    },
    {
        label: 'Sealyham Terrier',
        value: '1'
    },
    {
        label: 'Segugio Italiano',
        value: '1'
    },
    {
        label: 'Segugio Maremmano',
        value: '1'
    },
    {
        label: 'Shar Pei',
        value: '1'
    },
    {
        label: 'Shetland Sheepdog',
        value: '1'
    },
    {
        label: 'Shiba',
        value: '1'
    },
    {
        label: 'Shih Tzu',
        value: '1'
    },
    {
        label: 'Shikoku',
        value: '1'
    },
    {
        label: 'Siberian Husky',
        value: '1'
    },
    { 
        label: 'Sight hounds', 
        value: '113' 
    },
    {
        label: 'Saint Bernard',
        value: '1'
    },
    {
        label: 'Skye Terrier',
        value: '1'
    },
    {
        label: 'Sloughi',
        value: '1'
    },
    {
        label: 'Slovensky Cuvac',
        value: '1'
    },
    {
        label: 'Slovenský Hrubosrstý Stavac',
        value: '1'
    },
    {
        label: 'Slovensky Kopov',
        value: '1'
    },
    {
        label: 'Smålandsstövare',
        value: '1'
    },
    { 
        label: 'Small Musterlander',
        value: '113' 
    },
    {
        label: 'Spinone Italiano',
        value: '1'
    },
    {
        label: 'Srpski Gonic',
        value: '1'
    },
    {
        label: 'Srpski Trobojni Gonic',
        value: '1'
    },
    {
        label: 'Stabyhoun',
        value: '1'
    },
    {
        label: 'Staffordshire Bull Terrier',
        value: '1'
    },
    { 
        label: 'Staffordshire Terrier', 
        value: '82' 
    },
    {
        label: 'Styrian Wirehaired Beagle',
        value: '1'
    },
    {
        label: 'Sussex Spaniel',
        value: '1'
    },

    {
        label: 'Taiwan Dog',
        value: '1'
    },
    {
        label: 'Tatra dog',
        value: '1'
    },
    {
        label: 'Thai Bangkaew Dog',
        value: '1'
    },
    {
        label: 'Thai Ridgeback Dog',
        value: '1'
    },
    {
        label: 'Tibetan Mastiff',
        value: '1'
    },
    {
        label: 'Tibetan Spaniel',
        value: '1'
    },
    {
        label: 'Tibetan Terrier',
        value: '1'
    },
    {
        label: 'Tyrolean Brak',
        value: '1'
    },
    {
        label: 'Tornjak',
        value: '1'
    },
    {
        label: 'Tosa',
        value: '1'
    },
    {
        label: 'Toy poodle',
        value: '1'
    },
    {
        label: 'Czechoslovakian Wolfdog',
        value: '1'
    },
    {
        label: 'Västgötaspets',
        value: '1'
    },
    {
        label: 'Wirehaired Vizsla',
        value: '1'
    },
    {
        label: 'Vizsla Shorthair',
        value: '1'
    },
    {
        label: 'Volpino Italiano',
        value: '1'
    },

    {
        label: 'Weimaraner',
        value: '1'
    },
    {
        label: 'Welsh Corgi Cardigan',
        value: '1'
    },
    {
        label: 'Welsh Corgi Pembroke',
        value: '1'
    },
    {
        label: 'Welsh Springer Spaniel',
        value: '1'
    },
    {
        label: 'Welsh Terrier',
        value: '1'
    },
    {
        label: 'West Highland White Terrier',
        value: '1'
    },
    {
        label: 'West Highland Terrier',
        value: '82'
    },
    {
        label: 'Westphalian Badger',
        value: '1'
    },
    {
        label: 'West Siberian Laika',
        value: '1'
    },
    {
        label: 'Wetterhoun',
        value: '1'
    },
    {
        label: 'Whippet',
        value: '1'
    },
    {
        label: 'Yakutskaya Laika',
        value: '1'
    },
    {
        label: 'Yorkshire Terrier',
        value: '1'
    },
    {
        label: 'South Russian Ovcharka',
        value: '1'
    },
    {
        label: 'Black Russian Terrier',
        value: '1'
    },
    {
        label: 'Swedish Lapphund',
        value: '1'
    },
    {
        label: 'White Swiss Shepherd Dog',
        value: '1'
    },
    {
        label: 'Other',
        value: '1'
    },
];
  
const selected = ref(breeds[0]);
const query = ref('');

const filteredPeople = computed(() =>
  query.value === ''
    ? breeds
    : breeds.filter((breed) => {
        return breed.label.toLowerCase().includes(query.value.toLowerCase());
      })
);

const props = defineProps(['label', 'name', 'validation']);
</script>

<template>
  <div class="increase-z">
    <Combobox v-model="selected">
      <div class="relative mt-1 mb-5">
        <label for="" class="mt-4 mb-2"> {{ label }} </label>

        <div
          class="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm"
        >
          <ComboboxInput
            class="w-full py-6 pl-10 pr-10 text-2xl leading-5 text-gray-900 border-none focus:ring-0"
            :displayValue="(breed) => breed.label"
            @change="query = $event.target.value"
          />
          <ComboboxButton
            class="absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <ChevronUpDownIcon
              class="w-10 h-10 text-gray-400"
              aria-hidden="true"
            />
          </ComboboxButton>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute w-full py-1 mt-1 overflow-auto text-2xl bg-white rounded-md shadow-lg max-h-80 ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div
              v-if="filteredPeople.length === 0 && query !== ''"
              class="relative px-4 py-2 text-gray-700 cursor-default select-none"
            >
              {{ $('message.nothing_found') }}
            </div>

            <ComboboxOption
              v-for="breed in filteredPeople"
              as="template"
              :key="breed.id"
              :value="breed"
              v-slot="{ selected, active }"
            >
              <li
                class="relative py-2 pl-10 pr-4 cursor-default select-none"
                :class="{
                  'bg-[#f48f86] text-white': active,
                  'text-gray-900': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ breed.label }}
                </span>
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-1"
                  :class="{ 'text-white': active, 'text-[#f48f86]': !active }"
                >
                  <CheckIcon class="h-7 w-7" aria-hidden="true" />
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>

    <FormKit
      type="hidden"
      disabled="true"
      v-model="selected.label"
      :label="label"
      :name="name + '_label'"
      :validation="validation"
    />

    <FormKit
      type="hidden"
      disabled="true"
      v-model="selected.value"
      :label="label"
      :name="name"
      :validation="validation"
    />
  </div>
</template>
