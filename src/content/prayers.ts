/**
 * Prayer Content
 * From: Confession Assistant — Malankara Library
 * https://malankaralibrary.com/ImageUpload/a1b3f1051e68221281a5c8c3fa1cceee.pdf
 */

export interface Prayer {
    title: string;
    content: string;
}

export interface GuidePage {
    title: string;
    content: string;
}

export interface LanguageContent {
    prayerBefore: Prayer;
    actOfContrition: Prayer;
    guide: GuidePage[];
    attribution: {
        source: string;
        url: string;
    };
}

export const CONTENT: Record<string, LanguageContent> = {
    en: {
        prayerBefore: {
            title: "Prayer Before Confession",
            content: `**Penitential Act**

I confess to almighty God, and to you, my brothers and sisters, that I have greatly sinned, in my thoughts and in my words, in what I have done, and in what I have failed to do. Through my fault, through my fault, through my most grievous fault.

Therefore, I ask Blessed Mary, ever virgin, all the angels and saints, and you, my brothers and sisters, to pray for me, to the Lord our God.

**Prayer to Guardian Angel**

I ask you, O my Guardian Angel, my holy patron, St. Peter and St. Mary Magdalen and all the saints of God. Intercede for me a sinner, assist me that I may be able to declare my sins to the priest, fully, humbly, and with a contrite heart.

Send forth God's light into my soul, and reveal to me all those sins which I ought to confess at this time. O most merciful Jesus, be merciful unto me a sinner.

Amen.

*1 Hail Mary*`
        },
        actOfContrition: {
            title: "Act of Contrition",
            content: `O my God,
I am heartily sorry for having offended Thee,
and I detest all my sins,
because I dread the loss of heaven, and the pains of hell;
but most of all because they offend Thee, my God,
Who are all good and deserving of all my love.

I firmly resolve, with the help of Thy grace,
to confess my sins, to do penance,
and to amend my life.

Amen.`
        },
        guide: [
            {
                title: "Self-Examination",
                content: `**The Most Important Commandment**

*"You shall love the Lord your God with all your heart and with all your soul, and with all your mind and with all your strength."* — Mark 12:30

• Those who love me will obey my commandments (John 14:21)
• Love each other as I have loved you (John 15:12)
• If you do not forgive others, neither will your Heavenly Father forgive you
• We are not living, but dead if we do not love each other (1 John 3:14)
• Just as you did not do it to the least of these, you did not do it to me`
            },
            {
                title: "Scripture Reminders",
                content: `• Do not judge so that you may not be judged (Matthew 7:1)
• Greed is the same as idolatry (Colossians 3:5)
• Do not be a cause for others to fall (Luke 17:1)
• Satan is a liar and the father of lies (John 8:44)
• Wrongdoers will not inherit the kingdom of God (1 Corinthians 6:10)
• Be on guard so your hearts are not weighed down with worries of this world
• Do you take up your daily crosses as God desires? (Luke 9:23)`
            },
            {
                title: "Ten Commandments",
                content: `1. I am the Lord your God: you shall not have strange Gods before me
2. You shall not take the name of the Lord your God in vain
3. Remember to keep holy the Lord's Day
4. Honour your father and mother
5. You shall not kill
6. You shall not commit adultery
7. You shall not steal
8. You shall not bear false witness against your neighbour
9. You shall not covet your neighbour's wife
10. You shall not covet your neighbour's goods`
            },
            {
                title: "Commandment Summary",
                content: `**These ten commandments can be summarised into two:**

1. Love God above all.
2. Love one another as yourself.`
            },
            {
                title: "1st Commandment",
                content: `**I am the Lord your God. You shall not have strange gods before me.**

• Have I believed in other gods or worshipped them?
• Have I believed/practised witchcraft, horoscope, omens?
• Have I worn amulets, sacred threads, charms?
• Have I taken advice from sorcerers or black magicians?
• Have I done palm reading, occult arts, horoscopy, Satan worship?
• Have I believed in superstitions?
• Have I visited places of spiritism?`
            },
            {
                title: "1st Commandment (cont.)",
                content: `• Have I offered offerings at temples?
• Have I bowed before images of other gods?
• Have I given too much importance or feared the saints more than God?
• Have I tried to please people more than God?
• Have I enough faith in God and sacraments?
• Have I thanked God for His goodness and mercy?
• Have I cultivated my God-given talents?`
            },
            {
                title: "Pride",
                content: `**Do I have pride?**

• Do I desire honour and positions?
• Am I stubborn or selfish?
• Do I have greed for money?
• Do I idolize my work?
• Do I have gluttony?
• Am I addicted to alcohol, drugs, gambling?
• Have I pushed others into undesired habits?`
            },
            {
                title: "Priorities",
                content: `• Have I given first priority to God?
• Have I wrongly prioritised money, people, beauty, honour, work, power?
• Have I brought ill reputation on priests, nuns, evangelists?
• Have I humiliated or hurt them?
• Have I entered into court cases with the Church?`
            },
            {
                title: "2nd Commandment",
                content: `**You shall not take the name of the Lord your God in vain.**

• Do I tend to swear frequently? Have I cursed God?
• Have I done false witnesses/perjury?
• Have I filed false cases?
• Have I borne false witness in court or office?
• Do I have unfulfilled vows or prayers?
• Have I spoken disrespectfully of God?
• Have I insulted Saints or Holy objects?`
            },
            {
                title: "2nd Commandment (cont.)",
                content: `• Have I been ashamed to testify Jesus Christ?
• Have I associated with those who twist the teachings of Jesus?
• Have I cursed or blamed God for my downfall?
• Have I misused or hated the Word of God?
• Do I read the Holy Bible daily?
• Have I bore false witness in God's name?
• Have I resorted to false confessions?`
            },
            {
                title: "3rd Commandment",
                content: `**Remember to keep holy the Lord's Day.**

• Have I deliberately missed Mass on Sundays and holy days?
• Was my dressing, conduct appropriate at Holy Mass?
• Have I brought discomfort to fellow worshippers?
• Have I worked on Sunday or made others work?
• Have I received Eucharist unworthily or without preparation?
• Do I pray regularly - personal and family prayer?
• Have I done my yearly confession?`
            },
            {
                title: "3rd Commandment (cont.)",
                content: `• Have I abstained from meat on Fridays?
• Have I abstained from forbidden foods on prescribed days?
• Have I paid my tithes to God?
• Have I given thanks for blessings received?
• Have I forgotten or forsaken God in any part of my life?
• Have I obstructed the preaching of the Word of God?
• Have I turned away from God after receiving blessings?`
            },
            {
                title: "4th Commandment",
                content: `**Honour your father and mother.**

• Have I disrespected my parents?
• Have I given love and acceptance to them?
• Have I hurt them by speech or action?
• Have I cared for them in sickness and old age?
• Have I shown respect to my teachers and elders?
• Have I disobeyed my elders and superiors?
• Do I neglect the needs of my aged or disabled parents?`
            },
            {
                title: "5th Commandment",
                content: `**You shall not kill.**

• Have I held hatred or grudge against anyone?
• Have I tarnished the reputation of others?
• Have I hindered others from getting married?
• Have I resorted to or considered abortion?
• Have I supported abortion in ideology or practice?
• Have I attempted or supported suicide?
• Have I been the cause of anyone's death?`
            },
            {
                title: "5th Commandment (cont.)",
                content: `• Am I prone to jealousy or anger?
• Do I use profane language?
• Do I hold a grudge? Is there anyone I need to forgive?
• Have I subjected my body to alcohol, smoking, drugs, excessive work?
• Have I destroyed public property?
• Have I neglected people who needed my help?
• Have I resorted to revengeful behaviour?
• Have I led others to sin?`
            },
            {
                title: "6th Commandment",
                content: `**You shall not commit adultery.**

*The human body is the temple of the Holy Spirit (1 Cor 6:19)*

• Have I kept my body clean and healthy?
• Was I not enthusiastic to grow in holiness?
• Have I sinned with my eyes - books, posters, movies?
• Have I used my ears to hear obscene talk?
• Have I encouraged bad thoughts? Have I done enough to tame them?
• Have I committed adultery before or after marriage?`
            },
            {
                title: "6th Commandment (cont.)",
                content: `• Have I looked at others with unholy eyes?
• Have I tainted my body by pornography or erotic books?
• Have I aroused feelings of another through look, speech, or gesture?
• Have I caused others to sin by my speech, look, or behaviour?
• Have I been a bad role model?
• Have I dressed immodestly?
• Have I done/supported artificial family planning?`
            },
            {
                title: "7th Commandment",
                content: `**You shall not steal.**

• Have I resorted to unfair practices - exams, business, corruption, bribery?
• Have I behaved rudely to subordinates or children?
• Have I deliberately withheld paying someone?
• Have I treated and paid workers fairly?
• Have I taken property of someone?
• Have I used others for my benefit?
• Have I earned money through wrong means?`
            },
            {
                title: "8th Commandment",
                content: `**You shall not bear false witness.**

*"Lying lips are an abomination to the Lord" (Proverbs 12:22)*

• Do I lie? Have I faked documents?
• Have I acted against the truth?
• Have I let out secrets of someone?
• Am I a hypocrite?
• Do I spread false stories?
• Have I been a cause for defaming someone?
• Have I changed terms of parents' documents/will?`
            },
            {
                title: "9th Commandment",
                content: `**You shall not covet your neighbour's wife.**

• Have I looked at others with unholy eyes?
• Have I tainted my body by pornography, masturbation, erotic books?
• Have I aroused feelings of another inappropriately?
• Have I been careless in controlling my emotions?
• Have I caused others to sin by my speech, look, or behaviour?
• Have I been remorseful about not getting desired life partner?
• Have I been in illicit relationships?`
            },
            {
                title: "10th Commandment",
                content: `**You shall not covet your neighbour's goods.**

• Have I faked documents or put forward false allegations?
• Have I let out secrets? Am I a hypocrite?
• Have I changed boundary stones of property?
• Have I broken promises?
• Have I defaulted loans deliberately?
• Have I not returned what I found?
• Have I denied siblings their rights?
• Have I shown cruelty to animals?`
            },
            {
                title: "Marriage & Family",
                content: `• Have I physically hurt my spouse?
• Have I criticised spouse or their family?
• Have I been suspicious of my life partner?
• Have I not met physical needs of spouse?
• Have I punished children harshly?
• Do I always criticize my children?
• Have I put spouse or children down in front of others?
• Have I been unfaithful to my spouse?`
            },
            {
                title: "Work & Society",
                content: `• Have I disobeyed my elders and superiors?
• Have I shown loyalty to my organization?
• Have I shown compassion to the disabled, mentally ill?
• Have I disobeyed government laws?
• Have I evaded taxes fraudulently?
• Have I been punctual in my work?
• Have I wasted God-given time and opportunities due to laziness?`
            },
            {
                title: "Seven Cardinal Sins",
                content: `1. **Pride** — conquered by humility
2. **Envy** — conquered by brotherly love
3. **Wrath** — conquered by loving patience
4. **Gluttony** — conquered by moderation
5. **Lust** — conquered by pure love
6. **Sloth** — conquered by diligence
7. **Greed** — conquered by generous giving`
            },
            {
                title: "Sins Against the Holy Spirit",
                content: `• Despairing of Salvation (losing hope)
• Presumption of Salvation (illusory hope by self)
• Denying a truth recognised
• Envying the grace God gives to others
• Obstinacy in sin (continuing despite help)
• Final impenitence (dying without repenting)

*God is delighted by your intention to confess!*`
            }
        ],
        attribution: {
            source: "Confession Assistant — Malankara Library",
            url: "https://malankaralibrary.com/ImageUpload/90afdf9b66b4123508f43d356cb84c95.pdf"
        }
    },
    ml: {
        prayerBefore: {
            title: "കുമ്പസാരത്തിനുള്ള ജപം",
            content: `സര്‍വ്വശക്തനായ ദൈവത്തോടും നിത്യകന്യകയായ പരിശുദ്ധ മറിയത്തോടും പ്രധാന മാലാഖയായ വിശുദ്ധ മിഖായേലിനോടും വിശുദ്ധ സ്നാപക യോഹന്നാനോടും ശ്ലീഹന്മാരായ വിശുദ്ധ പത്രോസിനോടും വിശുദ്ധ പൌലോസിനോടും വിശുദ്ധ തോമായോടും സകല വിശുദ്ധരോടും പിതാവേ അങ്ങയോടും ഞാന്‍ ഏറ്റുപറയുന്നു.വിചാരത്താലും വാക്കാലും പ്രവൃത്തിയാലും ഞാന്‍ വളരെ പാപം ചെയ്തുപോയി.എന്റെ പിഴ,എന്റെ പിഴ,എന്റെ വലിയ പിഴ. ആകയാല്‍ നിത്യകന്യകയായ പരിശുദ്ധ മറിയത്തോടും പ്രധാന മാലാഖയായ വിശുദ്ധ മിഖായേലിനോടും വിശുദ്ധ സ്നാപക യോഹന്നാനോടും ശ്ലീഹന്മാരായ വിശുദ്ധ പത്രോസിനോടും വിശുദ്ധ പൌലോസിനോടും വിശുദ്ധ തോമായോടും സകല വിശുദ്ധരോടും പിതാവേ അങ്ങയോടും നമ്മുടെ കര്‍ത്താവായ ദൈവത്തോട് എനിക്കുവേണ്ടി പ്രാര്‍ദ്ധിക്കണമേ എന്നു ഞാന്‍ അപേക്ഷിക്കുന്നു.

ആമ്മേന്‍.`
        },
        actOfContrition: {
            title: "മനസ്താപപ്രകരണം",
            content: `എന്‍റെ ദൈവമേ, ഏറ്റം നല്ലവനും എല്ലാറ്റിനും ഉപരിയായി സ്നേഹിക്കപ്പെടുവാന്‍ യോഗ്യനുമായ അങ്ങേയ്ക്കെതിരായി പാപംചെയ്തുപോയതിനാല്‍ പൂര്‍ണ്ണഹൃദയത്തോടെ ഞാന്‍ മനസ്തപിക്കുകയും പാപങ്ങളെ വെറുക്കുകയും ചെയ്യുന്നു.

അങ്ങയെ ഞാന്‍ സ്നേഹിക്കുന്നു‍. എന്‍റെ പാപങ്ങളാല്‍ എന്‍റെ ആത്മാവിനെ അശുദ്ധനാ(യാ)ക്കിയതിനാലും സ്വര്‍ഗ്ഗത്തെ നഷ്ടപ്പെടുത്തി നരകത്തിന്‌ അര്‍ഹനായി (അര്‍ഹയായി) ത്തീര്‍ന്ന‍തിനാലും ഞാന്‍ ഖേദിക്കുന്നു‍.

അങ്ങയുടെ പ്രസാദവരസഹായത്താല്‍ പാപസാഹചര്യങ്ങളെ ഉപേക്ഷിക്കുമെന്നും മേലില്‍ പാപം ചെയ്യുകയില്ലെന്നും ഞാന്‍ ദൃഢമായി പ്രതിജ്ഞ ചെയ്യുന്നു. ഏതെങ്കിലുമൊരു പാപം ചെയ്യുക എന്നതിനേക്കാള്‍ മരിക്കാനും ഞാന്‍ സന്നദ്ധനാ(യാ)യിരിക്കുന്നു‍. ആമ്മേന്‍.`
        },
        guide: [
            {
                title: "ആത്മേശാധനാസഹായി",
                content: `**ഏറ്റവും പ്രധാന കല്പന**

*"നമ്മുെട ൈദവമായ കര്‍ത്താവാണ് ഏക കര്‍ത്താവ്. നീ നിെന്റെ ൈദവമായ കര്‍ത്താവിെന പൂര്‍ണ്ണഹൃദയത്തോടും, പൂര്‍ണ്ണാത്മാവോടും, പൂര്‍ണ്ണമനസ്സോടും, സര്‍വ്വശക്തിയോടും കൂെട സ്നേഹിക്കുക"* — (മര്‍ക്കോസ് 12:30)

• എെന്ന സ്നേഹിക്കുന്നവര്‍ എെന്റെ കല്പനകളും വചനങ്ങളും പാലിക്കും
• ഞാന്‍ നിങ്ങെള സ്നേഹിച്ചതുപോലെ നിങ്ങളും പരസ്പരം സ്നേഹിക്കുവിൻ
• നിങ്ങളോടു തെറ്റുചെയ്യുന്നവരോടു നിങ്ങൾക്ഷമിക്കയില്ലെങ്കിൽ സ്വര്‍ഗ്ഗസ്ഥനായ പിതാവ് നിങ്ങളുെട തെറ്റുകൾ നിങ്ങളോടും ക്ഷമിക്കുകയില്ല
• സഹോദരനെ സ്നേഹിക്കാത്തവൻ മരണത്തിൽ നിലകൊള്ളുന്നു`
            },
            {
                title: "തിരുവചന വിചിന്തനം",
                content: `• വിധിക്കപ്പെടാതിരിക്കാൻ നിങ്ങളും വിധിക്കരുത്
• വിഗ്രഹാരാധന തന്നെയായ ദ്രവ്യാസക്തി
• ദുഷ്ടപ്രേരണ നൽകുന്നതിനേക്കാൾ നല്ലത് കഴുത്തിൽ തിരികല്ല് കെട്ടി ...
• അസന്മാർഗ്ഗികളും, വ്യഭിചാരികളും, സ്വവർഗ്ഗഭോഗികളും കള്ളന്മാരും അത്യാഗ്രഹികളും, മദ്യപന്മാരും ദൈവരാജ്യം അവകാശമാക്കുകയില്ല
• അനുയായിയാകുവാൻ ആഗ്രഹിക്കുന്നെങ്കിൽ സ്വയം പരിത്യജിച്ച് അനുദിനം കുരിശുമെടുത്ത് ...
• ഭാര്യമാരേ, നിങ്ങൾ കര്‍ത്താവിനെ എന്ന പോലെ ഭര്‍ത്താക്കന്മാര്‍ക്ക് വിധേയരായിരിക്കുവിന്‍
• ഭര്‍ത്താക്കന്മാരേ, ക്രിസ്തു സഭയെ സ്നേഹിക്കുകയും ... നിങ്ങൾ ഭാര്യമാരെ സ്നേഹിക്കണം`
            },
            {
                title: "ദൈവകല്പനകൾ പത്ത്",
                content: `1. നിെന്റെ കര്‍ത്താവായ ദൈവം ഞാനാകുന്നു. ഞാനല്ലാത്ത മറ്റൊരു ദൈവം നിനക്കുണ്ടാകരുത്.
2. ദൈവത്തിെന്റെ തിരുനാമം വ്യഥാ പ്രയോഗിക്കരുത്.
3. കര്‍ത്താവിെന്റെ ദിവസം പരിശുദ്ധമായി ആചരിക്കണം.
4. മാതാപിതാക്കന്മാരെ ബഹുമാനിക്കണം.
5. കൊല്ലരുത്.
6. വ്യഭിചാരം ചെയ്യരുത്.
7. മോഷ്ടിക്കരുത്.
8. കള്ളസാക്ഷി പറയരുത്.
9. അന്യന്റെ ഭാര്യയെ മോഹിക്കരുത്.
10. അന്യന്റെ വസ്തുക്കൾ മോഹിക്കരുത്.`
            },
            {
                title: "കല്പനകളുടെ സംഗ്രഹം",
                content: `**ഈ പത്തു കല്പനകൾ രണ്ടു കല്പനകളിൽ സംഗ്രഹിക്കാം:**

1. എല്ലാറ്റിനും ഉപരിയായി ദൈവത്തെ സ്നേഹിക്കണം.
2. തന്നെപ്പോലെ മറ്റുള്ളവരെയും സ്നേഹിക്കണം.`
            },
            {
                title: "1-ാം പ്രമാണം",
                content: `**നിെന്റെ ദൈവമായ കര്‍ത്താവു ഞാനാകുന്നു. ഞാനല്ലാത്ത മറ്റൊരു ദൈവം നിനക്കുണ്ടാകരുത്.**

• അന്യ ദൈവങ്ങളോടുള്ള അടുപ്പം, ആരാധന, മന്ത്രവാദം, വാരഫലം, ശകുനം ഇവയിൽ വിശ്വസിച്ചിട്ടുണ്ടോ?
• തകിട്, ഏലസ്സ്, ഓതിയ ചരട് എന്നിവ ശരീരത്തിൽ ധരിച്ചിട്ടുണ്ടോ?
• മന്ത്രവാദികൾ, കണിയാന്മാർ, എന്നിവരുടെ അടുക്കൽ പോയിട്ടുണ്ടോ?
• പക്ഷാലോചനം, കവടിനിരത്തൽ ഇവ ചെയ്തിട്ടുണ്ടോ?
• അന്ധവിശ്വാസങ്ങളിൽ വിശ്വസിച്ചിട്ടുണ്ടോ?`
            },
            {
                title: "1-ാം പ്രമാണം (തുടർച്ച)",
                content: `• അമ്പലങ്ങളിൽ പോയി വിഗ്രഹങ്ങളെ വണങ്ങുകയോ പ്രസാദങ്ങൾ ഉപയോഗിക്കുകയോ ചെയ്തിട്ടുണ്ടോ?
• ദൈവത്തിൽ ആശ്രയിക്കാതെ ജാതകം, രാഹുകാലം, കൈനോട്ടം എന്നിവ നോക്കിയിട്ടുണ്ടോ?
• വിശുദ്ധർക്ക് അമിത പ്രാധാന്യം നൽകുകയോ ദൈവത്തേക്കാൾ കൂടുതൽ അവരെ ഭയപ്പെടുകയോ ചെയ്തിട്ടുണ്ടോ?
• ദൈവപ്രീതിയേക്കാൾ അധികം മനുഷ്യപ്രീതി നേടാൻ ശ്രമിച്ചിട്ടുണ്ടോ?`
            },
            {
                title: "അഹങ്കാരവും സ്വഭാവവും",
                content: `**അഹങ്കാരം ഉണ്ടോ?**

• സ്ഥാനമാനങ്ങൾ ആഗ്രഹിക്കുന്നുണ്ടോ? പിടിവാശി ഉണ്ടോ?
• ആഡംബര പ്രിയം ഉണ്ടോ? ധനമോഹം ഉണ്ടോ?
• സിനിമാ ഭ്രമം ഉണ്ടോ?
• മദ്യം, ലഹരിവസ്തുക്കൾ, പുകവലി, ചീട്ടുകളി തുടങ്ങിയ ദുശ്ശീലങ്ങൾ ഉണ്ടോ?
• ദൈവത്തിെന്റെ നന്മകൾക്ക് അവിടത്തോടു നന്ദി പറയാതിരുന്നോ?`
            },
            {
                title: "2-ാം പ്രമാണം",
                content: `**ദൈവത്തിെന്റെ തിരുനാമം വ്യഥാ പ്രയോഗിക്കരുത്.**

• കൂടെക്കൂടെ ആണയിടുന്ന സ്വഭാവം ഉണ്ടോ? ദൈവത്തെ ശപിച്ചിട്ടുണ്ടോ?
• കള്ളസത്യം ചെയ്തിട്ടുണ്ടോ? കള്ളസാക്ഷ്യം പറഞ്ഞിട്ടുണ്ടോ?
• നേർച്ചകൾ പൂർത്തിയാക്കാതിരുന്നിട്ടുണ്ടോ?
• ദൈവത്തെക്കുറിച്ച് അനാദരവോടെ സംസാരിച്ചിട്ടുണ്ടോ?
• വിശുദ്ധ ഗ്രന്ഥം ദിവസവും വായിക്കുകയും പഠിക്കുകയും ചെയ്യാതിരിക്കുന്നുണ്ടോ?`
            },
            {
                title: "3-ാം പ്രമാണം",
                content: `**കര്‍ത്താവിെന്റെ ദിവസം പരിശുദ്ധമായി ആചരിക്കണം.**

• ഞായറാഴ്ചകളിലും കടപ്പെട്ട ദിവസങ്ങളിലും ദിവ്യബലിയിൽ മനഃപൂർവം സംബന്ധിക്കാതിരുന്നോ?
• ബലിയർപ്പണത്തിന് യോജിക്കാത്ത വസ്ത്രധാരണവും പെരുമാറ്റവും വഴി തടസ്സമായിട്ടുണ്ടോ?
• ഞായറാഴ്ച്ചകളിൽ കൂലിപ്പണി ചെയ്യുകയോ ചെയ്യിപ്പിക്കുകയോ ചെയ്തിട്ടുണ്ടോ?
• സജീവമായ പ്രാർത്ഥനാജീവിതം ഉണ്ടോ? കുടുംബ പ്രാർത്ഥനയിൽ മുടക്കം വരുത്തിയിട്ടുണ്ടോ?`
            },
            {
                title: "4-ാം പ്രമാണം",
                content: `**മാതാപിതാക്കളെ ബഹുമാനിക്കണം.**

• മാതാപിതാക്കളെ ബഹുമാനിക്കാത്തോ വേദനപ്പിക്കുകയോ ചെയ്തിട്ടുണ്ടോ?
• അവരുടെ രോഗത്തിലും വാർദ്ധക്യത്തിലും ശുശ്രൂഷിക്കുകയും സഹായിക്കുകയും ചെയ്തിട്ടുണ്ടോ?
• മുതിർന്നവരെയും മേലധികാരികളെയും അനുസരിക്കാതിരുന്നിട്ടുണ്ടോ?
• ജീവിതപങ്കാളിയെ ശാരീരികമായോ മാനസികമായോ വേദനിപ്പിച്ചിട്ടുണ്ടോ?
• മക്കളെ കഠിനമായി ശിക്ഷിക്കുകയോ നിരന്തരം കുറ്റപ്പെടുത്തുകയോ ചെയ്തിട്ടുണ്ടോ?`
            },
            {
                title: "5-ാം പ്രമാണം",
                content: `**കൊല്ലരുത്.**

• മറ്റുള്ളവരെ വെറുക്കുകയോ വിദ്വേഷം വെച്ചുപുലർത്തുകയോ ചെയ്തിട്ടുണ്ടോ?
• ഭ്രൂണഹത്യ ചെയ്യുകയോ അതിനു പ്രേരണ നൽകുകയോ ചെയ്തിട്ടുണ്ടോ?
• ആത്മഹത്യാശമം നടത്തുകയോ മറ്റുള്ളവരെ അതിനു പ്രേരിപ്പിക്കുകയോ ചെയ്തിട്ടുണ്ടോ?
• മദ്യപാനം, പുകവലി, അമിതമായ ഭക്ഷണം വഴി ആരോഗ്യത്തെ നശിപ്പിച്ചിട്ടുണ്ടോ?
• പ്രതികാരം ചെയ്യുകയോ മറ്റുള്ളവരെ പാപത്തിനു പ്രേരിപ്പിക്കുകയോ ചെയ്തിട്ടുണ്ടോ?`
            },
            {
                title: "6, 9 പ്രമാണങ്ങൾ",
                content: `**വ്യഭിചാരം ചെയ്യരുത്. അന്യന്റെ ഭാര്യയെ മോഹിക്കരുത്.**

• അശുദ്ധമായ നോട്ടം, സംസാരം, പ്രവർത്തികൾ എന്നിവ ചെയ്തിട്ടുണ്ടോ?
• അശ്ലീല പുസ്തകങ്ങൾ, സിനിമകൾ എന്നിവയിലൂടെ മനസ്സിനെ അശുദ്ധമാക്കിയോ?
• സ്വർഗ്ഗഭോഗം, സ്വയംഭോഗം തുടങ്ങിയ തെറ്റുകളിൽ ഏർപ്പെട്ടിട്ടുണ്ടോ?
• മോശമായ വസ്ത്രധാരണം വഴി മറ്റുള്ളവർക്ക് ഇടർച്ച വരുത്തിയിട്ടുണ്ടോ?
• ദാമ്പത്യ ജീവിതത്തിൽ അവിശ്വസ്തത കാണിച്ചിട്ടുണ്ടോ?`
            },
            {
                title: "7, 10 പ്രമാണങ്ങൾ",
                content: `**മോഷ്ടിക്കരുത്. അന്യന്റെ വസ്തുക്കൾ ആഗ്രഹിക്കരുത്.**

• മോഷണം, വഞ്ചന, കൈക്കൂലി, അന്യായമായ ലാഭം എന്നിവയുണ്ടോ?
• മറ്റുള്ളവരുടെ വസ്തുക്കൾ കൈക്കലാക്കുകയോ അവരെക്കൊണ്ട് ലാഭമെടുക്കുകയോ ചെയ്തോ?
• അന്യന്റെ വസ്തുക്കൾ, പണം എന്നിവയിലുള്ള അമിതമായ ആശയുണ്ടോ?
• കടം വാങ്ങിയത് മടക്കിക്കൊടുക്കാതിരുന്നിട്ടുണ്ടോ?
• അന്യരുടെ സമ്പത്തിൽ അസൂയ വെച്ചുപുലർത്തുന്നുണ്ടോ?`
            },
            {
                title: "8-ാം പ്രമാണം",
                content: `**കള്ള സാക്ഷ്യം പറയരുത്.**

• നുണ പറയുന്ന സ്വഭാവമുണ്ടോ? പരദൂഷണം പറഞ്ഞു നടക്കാറുണ്ടോ?
• മറ്റുള്ളവരുടെ രഹസ്യങ്ങൾ പുറത്തു പറയുകയോ അപവാദം പ്രചരിപ്പിക്കുകയോ ചെയ്തോ?
• കള്ളരേഖകൾ ഉണ്ടാക്കുകയോ കള്ളസാക്ഷി പറയുകയോ ചെയ്തിട്ടുണ്ടോ?
• കാപട്യം കാണിക്കുകയോ ഉപായം പറഞ്ഞു വഞ്ചിക്കുകയോ ചെയ്തിട്ടുണ്ടോ?`
            },
            {
                title: "മറ്റുള്ളവരോടുള്ള കടമകൾ",
                content: `• ജോലികളിൽ കൃത്യനിഷ്ഠ പാലിക്കുന്നുണ്ടോ?
• സമൂഹത്തിലെ അംഗവൈകല്യമുള്ളവരോടും അഗതികളോടും കരുണ കാണിക്കാറുണ്ടോ?
• ദരിദ്രരെയും വിധവകളെയും പീഡിപ്പിച്ചിട്ടുണ്ടോ?
• ഭൂരിപക്ഷത്തോടു ചേർന്ന് അനീതിക്ക് കൂട്ടുനിൽക്കാറുണ്ടോ?
• siblings-ന് കിട്ടേണ്ട ന്യായമായ അവകാശങ്ങൾ നിഷേധിച്ചിട്ടുണ്ടോ?`
            },
            {
                title: "മൂലപാപങ്ങൾ",
                content: `1. **അഹങ്കാരം** (നിഗളം) - എളിമ വഴി ജയിക്കുക
2. **അസൂയ** - സഹോദരസ്നേഹം വഴി ജയിക്കുക
3. **കോപം** - ക്ഷമ വഴി ജയിക്കുക
4. **ഭക്ഷണാസക്തി** - മിതത്വം വഴി ജയിക്കുക
5. **മോഹം** - വിശുദ്ധമായ സ്നേഹം വഴി ജയിക്കുക
6. **അലസത** (മടി) - ഉത്സാഹം വഴി ജയിക്കുക
7. **ദ്രവ്യാഗ്രഹം** - ദാനധർമ്മം വഴി ജയിക്കുക`
            },
            {
                title: "വിശുദ്ധാത്മാവിനെതിരായ പാപങ്ങൾ",
                content: `• മോക്ഷം കിട്ടുകയില്ലെന്ന വിചാരം (നിരാശ)
• സൽപ്രവൃത്തി കൂടാതെ മോക്ഷം പ്രാപിക്കാമെന്ന മിഥ്യാ പ്രതീക്ഷ
• ഒരു കാര്യം സത്യമാണെന്നറിഞ്ഞിട്ടും അതിനെ നിഷേധിക്കുന്നത്
• അന്യരുടെ നന്മയിലുള്ള അസൂയ
• പാപം ചെയ്തതിനുശേഷം അനുതപിക്കാതെ പാപത്തിൽ തന്നെ ജീവിക്കുന്നത്
• അന്ത്യസമയത്തുപോലും അനുതപിക്കാതെ മരിക്കുന്നത്`
            }
        ],
        attribution: {
            source: "Confession Assistant — Malankara Library",
            url: "https://malankaralibrary.com/ImageUpload/90afdf9b66b4123508f43d356cb84c95.pdf"
        }
    }
};
