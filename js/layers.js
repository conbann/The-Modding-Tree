addLayer("p", {
    name: "prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        if (hasUpgrade('r', 11)) mult = mult.times(upgradeEffect('r', 11))
        if (hasUpgrade('p', 22)) mult = mult.pow(1.05)
        if (hasUpgrade('p', 24)) mult = mult.pow(1.2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
        title: "1st step of a long journy....",
        description: "Double your point gain.",
        cost: new Decimal(1),
        },
        12: {
            title: "2nd upgrade!",
            description: "Prestige Points boost Points!!",
            cost: new Decimal(3),
            effect() { 
                return player[this.layer].points.add(1).pow(0.01)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            13: {
                title: "Decent upgrade.",
                description: "Points boost prestige!",
                cost: new Decimal(10),
                effect() { 
                    return player.points.add(1).pow(0.008)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                },
                14: {
                    title: "The next layer...",
                    description: "2 times points",
                    cost: new Decimal(30),
                    
                    },
                    21: {
                        title: "New row :O.",
                        description: "points boost points",
                        cost: new Decimal(100),
                        effect() { 
                            return player.points.add(1).pow(0.0075)
                        },
                        unlocked() {return hasMilestone("r","0")},
                        effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
                        
                        },
                        22: {
                            title: "another prestige upgrade!?!",
                            description: "prestige gain is buffed by ^1.05",
                            cost: new Decimal(250),
                            unlocked() {return hasMilestone("r","0")},
                            },
                            23: {
                                title: "Upgrade power",
                                description: "Prestige points are boosted by Prestige upgrades bought",
                                cost: new Decimal(7.5e3),
                                effct() { let eff = Decimal.pow(1.4, player.p.upgrades.length);
                                },
                                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
                                unlocked() {return hasUpgrade("s","11")},
                                },
                                24: {
                                    title: "MORE PRESTIGE!",
                                    description: "prestige gain is buffed by ^1.2",
                                    cost: new Decimal(2.5e4),
                                    unlocked() {return hasUpgrade("s","11")},
                                    },
    
                           
    },
    layerShown(){return true}
    
})
addLayer("r", {
    name: "rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "r", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        rebirthShards: new Decimal(0),
    }},
    color: "#FF0000",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "rebirth points", // Name of prestige currency
    baseResource: "prestige points", // Name of resource prestige is based on
    baseAmount() {return player.p.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: Reset for rebirth points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    upgrades: {
        11: {
            title: "1st Rebirth upgrade!",
            description: "2 times points and also rebirths boost prestige",
            cost: new Decimal(1),
            effect() { 
                return player[this.layer].points.add(1).pow(0.6)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
            },
            12: {
                title: "oooo something new",
                description: "points are boosted by rebirths ",
                cost: new Decimal(5),
                effect() { 
                    return player[this.layer].points.add(1).pow(0.75)
                },
                effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" }, // Add formatting to the effect
                },
    },
    milestones: {
        0: {
            requirementDescription: "1 Rebirth",
            effectDescription: "Check back in prestige ;)",
            done() { return player[this.layer].points.gte(1) }
        },
        1: {
            requirementDescription: "5 Rebirths",
            effectDescription: "New layer",
            done() { return player[this.layer].points.gte(5) }
        },
        
    },
  
    layerShown() {
        return player.r.unlocked ||hasUpgrade("p","14")
      },
    
})
addLayer("s", {
    name: "Shards", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#800080",
    requires: new Decimal(5), // Can be a function that takes requirement increases into account
    resource: "Shards", // Name of prestige currency
    baseResource: "rebirth points", // Name of resource prestige is based on
    baseAmount() {return player.r.points}, // Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)

    upgrades: {
        11: {
            title: "Shard upgrade",
            description: "5 times points and 2 new point upgrades",
            cost: new Decimal(1),
           

        }
       
    },
    milestones: {
        
        
    },
    
        
    
  
    layerShown() {
        return player.s.unlocked ||hasMilestone("r","1")
      },
    
})


   
