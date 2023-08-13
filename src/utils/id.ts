const GUILD_ID:string = getId(process.env.GUILD_ID, "700061920170082314")
const NPE_ROLE:string = getId(process.env.NPE_ROLE, "700062057407578113")
const APPROBATION_RULES_CHANNEL:string = getId(process.env.APPROBATION_RULES_CHANNEL, "700365030234783804")
const SUGGESTION_CHANNEL:string = getId(process.env.SUGGESTION_CHANNEL, "951923621171986482")
const REPORT_PING_CHANNEL:string = getId(process.env.REPORT_PING_CHANNEL, "886963282882220042")
const RULES_MESSAGE:string = getId(process.env.RULES_MESSAGE, "988103529447182356")
const FORGE_CHANNELS:string[] = getIds([process.env.NEO_FORGE_120, process.env.FORGE_119, process.env.FORGE_118], ["1050427271133012049", "1019644671976296488", "1030059794637266964"])

function getId(devId: string, prodId: string): string{
    return process.env.NODE_ENV === 'production' ? prodId : devId;
}

function getIds(devId: string[], prodId: string[]): string[]{
    return process.env.NODE_ENV === 'production' ? prodId : devId;
}

export { GUILD_ID, NPE_ROLE, APPROBATION_RULES_CHANNEL, SUGGESTION_CHANNEL, REPORT_PING_CHANNEL, FORGE_CHANNELS, RULES_MESSAGE };