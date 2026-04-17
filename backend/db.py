import os
import logging
from borneo import NoSQLHandle, NoSQLHandleConfig
from borneo.iam import SignatureProvider

logger = logging.getLogger(__name__)

_handle = None


def get_nosql_handle() -> NoSQLHandle:
    global _handle
    if _handle is not None:
        return _handle

    region = os.getenv("OCI_REGION", "us-chicago-1")
    compartment = os.getenv("OCI_COMPARTMENT_ID")
    use_instance_principal = os.getenv("USE_INSTANCE_PRINCIPAL", "false").lower() == "true"

    if use_instance_principal:
        logger.info("NoSQL: connecting via Instance Principal (region=%s)", region)
        provider = SignatureProvider.create_with_instance_principal()
    else:
        logger.info("NoSQL: connecting via ~/.oci/config (region=%s)", region)
        provider = SignatureProvider()

    config = NoSQLHandleConfig(region, provider)
    if compartment:
        config.set_default_compartment(compartment)
    _handle = NoSQLHandle(config)
    logger.info("NoSQL: handle created")
    return _handle


def close_nosql_handle():
    global _handle
    if _handle:
        _handle.close()
        _handle = None
        logger.info("NoSQL: handle closed")
