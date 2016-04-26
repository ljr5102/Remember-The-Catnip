# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all
user1 = User.create!(username: "mrSmalz", email_address: "mrSmalz@gmail.com", password: "password")

user_id = User.first.id
Task.destroy_all

task26 = Task.create!(owner_id: user_id, name: "Hello human!  Thanks for checking out the site!")
task27 = Task.create!(owner_id: user_id, name: "I am a task.  Click on me for more info!", start_date: Date.today, due_date: Date.today + 3, priority: 2, estimate: "25 seconds")
task28 = Task.create!(owner_id: user_id, name: "See the text field above?  Start typing in it!")
task29 = Task.create!(owner_id: user_id, name: "Pretty cool huh?  Now go add a few tasks of your own!")
task30 = Task.create!(owner_id: user_id, name: "Want to store them in a list?  Create one by clicking the '+' next to Lists")
task31 = Task.create!(owner_id: user_id, name: "Now do the same thing for locations.")
task32 = Task.create!(owner_id: user_id, name: "Click on that location to see it show up on a map!")
task33 = Task.create!(owner_id: user_id, name: "Enjoy the rest of the site!")
task1_img = File.open('app/assets/images/seeds/image(2).jpeg')
task1 = Task.create!(owner_id: user_id, name: "Sleep", start_date: Date.today, due_date: Date.today, priority: 1, estimate: "5 hours", image: task1_img)
task2_img = File.open('app/assets/images/seeds/image(1).jpeg')
task2 = Task.create!(owner_id: user_id, name: "Relax", start_date: Date.today, due_date: Date.today + 1, priority: 2, estimate: "20 minutes", image: task2_img)
task3_img = File.open('app/assets/images/seeds/image(3).jpeg')
task3 = Task.create!(owner_id: user_id, name: "Help humans pack", start_date: Date.today - 3, due_date: Date.today + 10, priority: 3, estimate: "10 seconds", image: task3_img)
task4_img = File.open('app/assets/images/seeds/image(4).jpeg')
task4 = Task.create!(owner_id: user_id, name: "Sit menacingly", start_date: Date.today - 5, due_date: Date.today, priority: 1, image: task4_img)
task5_img = File.open('app/assets/images/seeds/image(5).jpeg')
task5 = Task.create!(owner_id: user_id, name: "Perch on humans furniture", start_date: Date.today, due_date: Date.today + 1, priority: 1, estimate: "20 seconds", image: task5_img)
task6_img = File.open('app/assets/images/seeds/image(6).jpeg')
task6 = Task.create!(owner_id: user_id, name: "Catch up on sleep", start_date: Date.today - 10, due_date: Date.today + 65, priority: 1, estimate: "7 hours", image: task6_img)
task7_img = File.open('app/assets/images/seeds/image(7).jpeg')
task7 = Task.create!(owner_id: user_id, name: "Hang out in humans water dispenser", start_date: Date.today, due_date: Date.today, priority: 3, estimate: "8 minutes", image: task7_img)
task9_img = File.open('app/assets/images/seeds/image(9).jpeg')
task9 = Task.create!(owner_id: user_id, name: "Mid-afternoon nap", image: task9_img)
task10 = Task.create!(owner_id: user_id, name: "Call Sennacy", due_date: Date.today + 1, priority: 1, estimate: "10 minutes")
task11 = Task.create!(owner_id: user_id, name: "Bite humans at approximately 5am")
task12 = Task.create!(owner_id: user_id, name: "Eat breakfast with Breakfast", due_date: Date.today + 1, priority: 3)
task13 = Task.create!(owner_id: user_id, name: "Meow at strange noises", start_date: Date.today, due_date: Date.today + 4, priority: 2)
task14 = Task.create!(owner_id: user_id, name: "Schedule playdate with Paprika", start_date: Date.today, due_date: Date.today + 5, estimate: "10 minutes")
task15 = Task.create!(owner_id: user_id, name: "Eat humans headphones", start_date: Date.today, due_date: Date.today + 6, estimate: "1 hour")
task16 = Task.create!(owner_id: user_id, name: "Shove humans phone off shelf", start_date: Date.today, due_date: Date.today + 7, priority: 1, estimate: "5 hours")
task17 = Task.create!(owner_id: user_id, name: "Scratch humans new rug", start_date: Date.today, due_date: Date.today + 3, priority: 2, estimate: "25 seconds")
task18 = Task.create!(owner_id: user_id, name: "Get more sleep", start_date: Date.today, due_date: Date.today + 1, priority: 1)
task19 = Task.create!(owner_id: user_id, name: "Take a nap", start_date: Date.today, due_date: Date.today)
task20 = Task.create!(owner_id: user_id, name: "Bite humans", start_date: Date.today, due_date: Date.today + 1, priority: 3, estimate: "1 minute")
task21 = Task.create!(owner_id: user_id, name: "Sit on humans when morning alarm goes off", start_date: Date.today, due_date: Date.today, priority: 1)
task22_img = File.open('app/assets/images/seeds/image(10).jpeg')
task22 = Task.create!(owner_id: user_id, name: "Try out new sleeping position", image: task22_img)
task23_img = File.open('app/assets/images/seeds/image(11).png')
task23 = Task.create!(owner_id: user_id, name: "Dress up in formal attire", image: task23_img)
task24_img = File.open('app/assets/images/seeds/image(12).jpeg')
task24 = Task.create!(owner_id: user_id, name: "Late evening nap", image: task24_img)
task25_img = File.open('app/assets/images/seeds/image(13).jpeg')
task25 = Task.create!(owner_id: user_id, name: "Bathe self", image: task25_img)


List.destroy_all
list1 = List.create!(name: "All Things Sleep Related", creator_id: user_id)
list1.tasks = [task1, task6, task9, task18, task19, task22, task24]
list2 = List.create!(name: "Annoy The Humans", creator_id: user_id)
list2.tasks = [task7, task15, task16, task20]

Location.destroy_all
location1 = Location.create!(name: "Cat Cafe", creator_id: user_id, address: "Meow Parlour, Hester Street, New York, NY, United States", lng: -73.9944555, lat: 40.7169698)
location1.tasks = [task9, task14]
