let xp    = 0;
let level = 1;

function addXp(xpr)
{
    xp += xpr;
}

function levelForXp(exp)
{
    let points = 0;
    let output = 0;
    for (let lvl = 1; lvl <= 100; lvl++) {
        points += Math.floor(lvl + 100.0 * Math.pow(2.0, lvl / 7.0));
        output = Math.floor(points / 2);

        if ((output - 1) >= exp) {
            return lvl;
        }
    }
    return 99;
}

function getXPForLevel(level)
{
    let points = 0;
    let output = 0;
    for (let lvl = 1; lvl <= level; lvl++) {
        points += Math.floor(lvl + 100.0 * Math.pow(2.0, lvl / 7.0));
        if (lvl >= level) {
            return output;
        }
        output = Math.floor(points / 2);
    }
    return 0;
}

setInterval(() => {

    addXp(15);

    level = levelForXp(xp);

    console.log(
        xp, level, getXPForLevel(level)
    )

}, 100);

function levelInfo(xp)
{
    let levelInfo          = {
        currentXp : xp,
    };
    levelInfo.currentLevel = levelForXp(levelInfo.currentXp);
    levelInfo.xpForNext    = (getXPForLevel(levelInfo.currentLevel + 1) - levelInfo.currentXp);
    levelInfo.nextLevel    = levelForXp(levelInfo.currentXp + levelInfo.xpForNext);

    return levelInfo;
}

console.log(
    levelInfo(20000),
)
console.log(
    levelInfo(21000),
)
console.log(
    levelInfo(30000),
)