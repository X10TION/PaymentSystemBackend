function getRandom(num)
{
   str = Math.floor(Math.random() * num -1);

    return str;
}
module.exports = getRandom()