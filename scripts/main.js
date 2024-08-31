import { system, world } from '@minecraft/server';

system.afterEvents.scriptEventReceive.subscribe(({ sourceEntity }) => { sourceEntity.remove() }, { namespaces: ['xov'] })

world.beforeEvents.worldInitialize.subscribe(({ blockComponentRegistry }) => {

    blockComponentRegistry.registerCustomComponent('xov:outcrop', {
        onPlayerInteract({ player, block, dimension }) {
            player.playSound('dig.stone', { location: block, volume: 0.5 })
            dimension.runCommandAsync(`loot spawn ${player.location.x} ${player.location.y} ${player.location.z} loot "blocks/${block.typeId.split(':').pop()}.loot"`)
            block.setType('air')
        }
    })

    blockComponentRegistry.registerCustomComponent('xov:deer_carcass', {
        onTick({ block, dimension }) {
            if (dimension.getEntitiesAtBlockLocation(block).filter(entity => entity.typeId == 'xov:deer_carcass').length <= 0) dimension.spawnEntity('xov:deer_carcass', block.bottomCenter())
        },
        onPlace({ block, dimension }) {
            dimension.spawnEntity('xov:deer_carcass', block.bottomCenter())
        },
        onPlayerInteract({ player, block, dimension }) {
            player.playSound('dig.stone', { location: block, volume: 0.5 })
            dimension.spawnParticle('minecraft:critical_hit_emitter', block.center())
            dimension.runCommandAsync(`loot spawn ${player.location.x} ${player.location.y} ${player.location.z} loot "blocks/${block.typeId.split(':').pop()}.loot"`)
            dimension.getEntitiesAtBlockLocation(block).filter(entity => entity.typeId == 'xov:deer_carcass').forEach(entity => entity.remove())
            block.setType('air')
        }
    })

})