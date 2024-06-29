class fighter {
    constructor(atk) {
        this.atk = atk
    }

    attack() {
        return this.atk * 2
    }
}

class magicFighter extends fighter {
    constructor(atk, mgc) {
        super(atk)
        this.mgc = mgc
    }

    attack() {
        return super.attack() + this.mgc
    }

}

function createFighter(atk) { // コンストラクタ関数
    this.atk = atk
}

createFighter.prototype = {
    attack: function () {
        return this.atk * 2
    }
}

function createMagicFighter(atk, mgc) { // 魔法戦士のコンストラクタ関数
    createFighter.call(this, atk)
    this.mgc = mgc
}

createMagicFighter.prototype = Object.create(createFighter.prototype) // createFighterのプロトタイプを継承
createMagicFighter.constructor = createMagicFighter // constructorを魔法戦士のものに設定
createMagicFighter.prototype.attack = function () { // 魔法戦士のattackメソッド
    return createFighter.prototype.attack.call(this) + this.mgc
}

export { fighter, magicFighter, createFighter, createMagicFighter }
