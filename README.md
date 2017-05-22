# POINT-BOT
Keep track of points for our department's interns

# API

## anyone
/points list

## user
/points [user pass] interns reset [name]

/points [user pass] interns megareset 


/points [user pass] give [name] [amount]

/points [user pass] take [name] [amount] 


## admin

#### interns
/points [admin pass] interns add [name]

/points [admin pass] interns drop [name]

/points [admin pass] interns megadrop

/points [admin pass] interns response [name] [message]

#### users
/points [admin pass] users list

/points [admin pass] users add [name]

/points [admin pass] users drop [name]

/points [admin pass] users megadrop

/points [admin pass] users award [name] [user|intern|(gives|takes)|amount|(.*)*]

/points [admin pass] users response [name] [message]
