var mongoose = require('mongoose');

var fs = require('fs');
var path = require('path');

var images_dir_path = './images';
var filenames = fs.readdirSync(images_dir_path, 'utf8');
filenames =
filenames.filter(
    function(filename) {return !filename.startsWith('.');
}).map(
function(filename) {return path.join(images_dir_path, filename);
}).filter(
function(filename) {return fs.statSync(filename).isFile();
});

var images = filenames.map(
        function(filename) {return fs.readFileSync(filename).toString('base64');
    });


    var cities         = [ 'Naples', 'Rome', 'Milan', 'Turin', 'Palermo', 'Genoa', 'Bologna', 'Tokyo', 'Setagaya', 'Nerima', 'Edogawa', 'Adachi', 'Kagoshima', 'Funabashi', 'Himeji', 'Suginami' ];
    var streets        = [ 'Tenjin', 'Nakasu', 'Kamiyacho', 'Hacchobori', 'Hondori Street', 'Harborland', 'Nankinmachi', 'Motomachi', 'Sannomiya', 'around Shijo Street', 'Pontocho', 'Shin-Kyogoku Street', 'Meieki', 'Sakae', 'Kanayama', 'Via Cavour', 'Via della Conciliazione',  'Via del Corso',  'Via dei Fori Imperiali',  'Via Giulia',  'Via Margutta',  'Via Nazionale',  'Via' ];
    var shop_names     = [ 'Shop Name 1', 'Shop Name 2', 'Shop Name 3', 'Shop Name 4', 'Shop Name 5', 'Shop Name 6', 'Shop Name 7', 'Shop Name 8', 'Shop Name 9', 'Shop Name 10', 'Shop Name 11', 'Shop Name 12', 'Shop Name 13', 'Shop Name 14', 'Shop Name 15', 'Shop Name 16', 'Shop Name 17', 'Shop Name 18', 'Shop Name 19', 'Shop Name 20' ];
    var names          = [ 'Giorno', 'Bruno', 'Leone', 'Guido', 'Narancia', 'Pannacotta', 'Trish', 'Jean Pierre', 'Coco', 'Pericolo', 'Diavolo', 'Vinegar', 'Cioccolata', 'Secco', 'Polpo', 'Squalo', 'Tiziano', 'Carne', 'Mario', 'Sale', 'Risotto', 'Formaggio', 'Illuso', 'Prosciutto', 'Pesci', 'Melone', 'Ghiaccio', 'Scolippi', 'Koichi', 'Jotaro', 'Jolyne', 'Ermes', 'Emporio', 'Foo', 'Jotaro', 'Weather', 'Narciso', 'Enrico', 'Johngalli', 'Thunder', 'Lang', 'Sports', 'Viviano', 'Miuccia', 'Donatello', 'Romeo', 'Perla' ];
    var lastnames      = [ 'Bucciarati', 'Giovanna', 'Abbacchio', 'Mista', 'Ghirga', 'Fugo', 'Una', 'Polnareff', 'Jumbo', 'Doppio', 'Zucchero', 'Nero', 'Hirose', 'Kujo', 'Cujoh', 'Costello', 'Alnino', 'Fighters', 'Kujo', 'Report', 'Anasui', 'Pucci', 'A', 'McQueen', 'Rangler', 'Maxx', 'Westwood', 'Miuller', 'Versus', 'Jisso', 'Pucci' ];
    var domains        = [ 'example.com', 'notrealdomain.com', 'hello.com', 'greatidea.com', 'foss.org', 'jikanettotanaka.jp', 'freepuppies.org', 'evil.com', 'goodinc.com', 'megalo.back', 'descend.com', 'majortom.com', 'naughyboys.com', 'teotorriatte.jp' ];
    var job_titles     = [ 'SEO Manager', 'Clerk', 'Social Media Marketing Manager', 'Mail Clerk', 'Sales Trainee', 'Programs Coordinator', 'Copywriter', 'Administrative Manager', 'Sales Manager', 'Services Officer', 'eCommerce Marketing Manager', 'Investments Representative', 'Contract Administrator', 'Media Assistant', 'Marketing Coordinator', 'VP for Marketing', 'Administrative Assistant', 'Assistant Director', 'Regional Sales Executive', 'Content Writer', 'Enterprise Sales Representative', 'Public Relations Specialist', 'Sales Engineer', 'Market Research Analyst', 'Market Development Manager', 'Sales Representative', 'Media Relations Coordinator', 'Office Clerk', 'Salesperson', 'JTitle 30', 'JTitle 31', 'JTitle 32', 'JTitle 33', 'JTitle 34', 'JTitle 35', 'JTitle 36', 'JTitle 37', 'JTitle 38', 'JTitle 39', 'JTitle 40', 'JTitle 41', 'JTitle 42', 'JTitle 43', 'JTitle 44', 'JTitle 45', 'JTitle 46', 'JTitle 47', 'JTitle 48', 'JTitle 49', 'JTitle 50'];
    var supplier_names = [ 'Higashikata LLC', 'Nijimura Co.', 'Hirose LP', 'Kishibe LLC', 'Kujo LP', 'Sugimoto Inc.', 'Yangu Co.', 'Joestar LLC', 'Hazekura LP', 'Yamagishi Co.', 'Fungami LLC', 'Kobayashi Inc.', 'Hazamada Co.', 'Trussardi LP', 'Tsuji LLC', 'Kira LLC', 'Otoishi Co.', 'Katagiri LP', 'Oyanagi LLC', 'Kanedaichi Inc.', 'Miyamoto LP', 'Kinoto Inc.', 'Kawajiri Co.'];
    var product_names  = [ 'Peperoni', 'Carne', 'Bacio', 'Capperi', 'Porchetta', 'Frico', 'Macchiato', 'Pollo', 'Mozzarella', 'More', 'Acciughe', 'Pranzo', 'Grappa', 'Wurstel', 'Fragola', 'Merenda', 'Fiordilatte', 'Cinghiale', 'Gianduja', 'Guanciale', 'Speck', 'Formaggio', 'Basilico', 'Ananas', 'Cornetto', 'Lampone', 'Cipolle', 'Caffe', 'Colazione', 'Caffe corretto', 'Rosso/biano', 'Ricci di mare', 'Origano', 'Finocchiona', 'Cioccolato', 'Mascarpone', 'Vino', 'Panino', 'Peperonicni', 'Pane', 'Tartufo nero', 'Panna', 'Salsiccia', 'Il conto', 'Crema', 'Cappuccino', 'Panini', 'Pesce', 'Coperto', 'Stracciatella', 'Granita'];
    var product_types  = [ 'Dairy', 'Sweets', 'Oils', 'Vegetables', 'Fruits', 'Eggs', 'Fish', 'Meat', 'Chicken', 'Tea and Coffee', 'Cereal', 'Juices', 'Bakery', 'Sauces', 'Grains', 'Household Goods', 'Hygiene', 'Alcohol', 'Cigarettes', 'Other'];

    var fire_reason = [ 'Promotion', 'Change of Job Position' ];
    var fatal_fire_reasons = [ 'Damaging Company Property', 'Drug or Alcohol Possession at Work', 'Falsifying Company Records', 'Insubordination', 'Misconduct', 'Poor Performance', 'Stealing', 'Using Company Property for Personal Business', 'Taking Too Much Time Off', 'Violating Company Policy' ];


function padWithZeroes( number, width ){
      width = width + 1 - number.toString().length;
      var a = new Array(width).join('0')+''+number;
      return a;
}

var trunc = Math.trunc;
var random = Math.random;


function rand_int(a, b){
    return trunc(a+(b-a+1)*random());
}

function rand_elem(collection){
    return collection[rand_int(0, collection.length-1)];
}

function rand_address(){
    return rand_int(1,300) + ' ' + rand_elem(streets) + ', ' + rand_elem(cities);
}

// '8'+s.match(/-(.*)$/)[1].replace(/-/g,'')
function rand_phone(){
    country_code = rand_int(0,999)
    num = padWithZeroes(rand_int(0,9999999999), 10);
    return '+'+country_code+'-'+num.slice(0,3)+'-'+num.slice(3,6)+'-'+num.slice(6,10)
}

function range(a, b){
    return Array(b-a).fill().map( (_,i) => i+a)
}

const MILLISINDAY = 86400000;

Date.prototype.addDays = function(days){
    this.setTime(this.getTime() + MILLISINDAY*days);
    return this;
}

function datePlusDays(date, days){
    return new Date(date.getTime()).addDays(days);
}

Employee = require('../models/employee');
Product = require('../models/product');
Purchase = require('../models/purchase');
Shop = require('../models/shop');
StockChange = require('../models/stockchange');
Supplier = require('../models/supplier');

emp_num = 50;
max_hirehistory_length = 10
purchases_num = 50;
product_per_purchases_max = 10;
max_products_per_purchase = 10;
stockChanges_num = 50;
max_products_per_stockchange = 10;
max_products_count_per_sc = 10;

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

var shop_ids = [];
var emp_ids = [];
var sup_ids = [];
var emp_hiredates = [];


function generate(callback){

    console.log("Starting generation");

    var gdate = new Date();

    console.log('Generating shops');
    shops = shop_names.map(
        sname => {return {
            name    : sname,
            address : rand_address(),
            phone   : rand_phone()
        }});
    console.log('Adding shops to database');
    Shop.addShop(shops,
    (err, res) => {
        if(err) return console.log(err.message);

        console.log('Generating employees');
        shop_ids = res.map( v => v._id );

        employees = range(0,emp_num).map(
            i => {
                var first_hire_date = datePlusDays(gdate, -rand_int(7000,16000));
                var birthdate = datePlusDays(gdate, -rand_int(7000, 25000))
                var firstname = rand_elem(names);

                var hh_length = rand_int(1, max_hirehistory_length);
                var a_days = 0;
                var b_days = trunc( (gdate.getTime()- first_hire_date.getTime())/MILLISINDAY );

                hirings = []
                for(j=1; j<=hh_length; j++){
                    var contract_id = []

                    hiring = {
                        title    : rand_elem(job_titles),
                        salary   : rand_int(1,100) * 100,
                        shopId   : rand_elem(shop_ids),
                        hiredate : datePlusDays(first_hire_date, a_days)
                    };
                    // add some days
                    a_days = rand_int(a_days+1, b_days);
                    absolutely_fired = (random() < 0.1);

                    hiring['fireDate']   = datePlusDays(first_hire_date, a_days);
                    hiring['fireReason'] = rand_elem(absolutely_fired?fatal_fire_reasons:fire_reason);
                    hirings.push(hiring);
                    if(absolutely_fired) break;
                }

                return {
                    lastname   : rand_elem(lastnames),
                    firstname  : firstname,
                    middlename : rand_elem(names),
                    birthdate  : birthdate,
                    hiredate   : first_hire_date,
                    photo      : rand_elem(images),
                    phone      : rand_phone(),
                    email      : firstname+birthdate.getYear()+'@'+rand_elem(domains),
                    hirehistory: hirings
                }
            })

    console.log('Adding employees to database');
    Employee.addEmployees(employees,
    (err, res) => {
        if(err) return console.log(err.message);
        console.log('Generating suppliers');

        emp_ids = res.map( v => v._id );

        suppliers = supplier_names.map(
            sname => {
                return {
                    name    : sname,
                    address : rand_address(),
                    phone   : rand_phone(),
                    email   : 'sales'+'@'+sname.toLowerCase().replace(/[ .]/g, '')+'.com'
                }
            });
    console.log('Adding suppliers to database');
    Supplier.addSupplier(suppliers,
    (err, res) => {

        if(err) return console.log(err.message);
        sup_ids = res.map( v => v._id );

        console.log('Generating products');

        products = product_names.map(
            pname => {
                return {
                    name       : pname,
                    supplierid : rand_elem(sup_ids),
                    price      : rand_int(1,500),
                    shelfLife  : rand_int(1,52)*30*MILLISINDAY,
                    type       : rand_elem(product_types)
                }
            });

    console.log('Adding products to database');
    Product.addProduct(products,
        (err, res) => {
        if(err) return console.log(err.message);

        prod_ids = res.map( v => v._id );

        console.log('Generating purchases');

        purchases = range(0, purchases_num).map(
                () => {
                    return {
                        shopid: rand_elem(shop_ids),
                        cassierid: rand_elem(emp_ids),
                        purchasedate: datePlusDays(gdate, -rand_int(1825, 3650)),
                        items:
                            // range(1, 1+rand_int(0, product_per_purchases_max)).map(
                            range(1, 2).map(
                                () => {
                                    return {
                                        productId: rand_elem(prod_ids),
                                        count: rand_int(1,max_products_per_purchase)
                                    }
                                }
                            )
                    }
                }
            );
    console.log('Adding purchases to database');
    Purchase.addPurchase(purchases,
        (err, res) => {
        if(err) return console.log(err.message);

        console.log('Generating Stock Changes');

        stockchanges = range(0, stockChanges_num).map(
            () => {
                arr_date = datePlusDays(gdate, -rand_int(1825, 3650))
                return {
                    shopid: rand_elem(shop_ids),
                    arrivaldate: arr_date,
                    items: range(0, 50).map(
                        () => {
                            return {
                                productid: rand_elem(prod_ids),
                                count: rand_int(1, max_products_count_per_sc),
                                manufactureDate: datePlusDays(arr_date, -rand_int(1, 60))
                            }
                        }
                    )
                }
            }
        )

    console.log('Adding Stock Changes to database');
    StockChange.addStockChange(stockchanges,
        (err, res) => {
        if(err) return console.log(err.message);

        callback()


// they told async is cool
// they told async is hip
// even though it is manure
// even though it is not real
})})})})})})};

mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;
db.on('error', function() { console.log("Connection error!"); });
db.once('open', function() {
    console.log("Connected to db.");
    generate( () => {
        db.close();
        process.exit();
    });
});
