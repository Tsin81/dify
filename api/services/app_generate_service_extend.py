from typing import Any

from extensions.ext_database import db
from models.model import App, AppStatisticsExtend


class AppGenerateServiceExtend:
    @staticmethod
    def calculate_cumulative_usage(app_model: App, args: Any):
        if app_model is None:
            return
        if "conversation_id" in args.keys():
            # determine if it's a new conversation
            if len(args["conversation_id"]) > 0:
                return
        # app usage +1
        try:
            statistics: AppStatisticsExtend = AppStatisticsExtend.query.filter_by(app_id=app_model.id).first()
            if statistics is None:
                db.session.add(AppStatisticsExtend(app_id=app_model.id, number=1))
            else:
                statistics.number += 1
            db.session.commit()
        except:
            pass
